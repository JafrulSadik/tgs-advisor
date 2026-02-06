"use client";

import {
  createCertification,
  updateCertification,
} from "@/app/actions/certification-action";
import { getImageUrl } from "@/lib/image-url";
import {
  certificationCreateSchema,
  type CertificationCreateInput,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type CertificateFormProps = {
  certificate?: CertificationCreateInput;
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export function CertificateForm({ certificate }: CertificateFormProps) {
  const router = useRouter();
  const { id } = useParams<{ id?: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string>(
    certificate?.image ?? "",
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CertificationCreateInput>({
    resolver: zodResolver(certificationCreateSchema),
    defaultValues: {
      title: certificate?.title ?? "",
      image: certificate?.image ?? "",
    },
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads/certificates", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      throw new Error(data?.error || "Failed to upload image");
    }
    return data as { success: boolean; url: string; filename: string };
  };

  const deleteImageByFilename = async (filenameOrUrl?: string) => {
    if (!filenameOrUrl) return;
    const query = filenameOrUrl.startsWith("/")
      ? `url=${encodeURIComponent(filenameOrUrl)}`
      : `filename=${encodeURIComponent(filenameOrUrl)}`;
    const url = new URL(
      `/api/uploads/certificates?${query}`,
      window.location.origin,
    );
    await fetch(url.toString(), { method: "DELETE" });
  };

  const onSubmit = async (data: CertificationCreateInput) => {
    setServerError(null);

    let uploaded: { url: string; filename: string } | null = null;

    try {
      if (selectedFile) {
        if (selectedFile.size > MAX_SIZE) {
          setServerError("Image must be 2MB or less.");
          return;
        }
        uploaded = await uploadImage(selectedFile);
        data.image = uploaded.url;
      } else {
        data.image = initialImage || "";
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setServerError(message);
      return;
    }

    const certificateId = id ? Number(id) : null;
    const result = certificateId
      ? await updateCertification(certificateId, data)
      : await createCertification(data);

    if (result?.error) {
      setServerError(result.error);
      if (uploaded?.filename) {
        await deleteImageByFilename(uploaded.filename);
      }
      return;
    }

    if (
      certificateId &&
      uploaded?.filename &&
      initialImage &&
      initialImage !== uploaded.url
    ) {
      const prevName = initialImage.split("/").pop();
      if (prevName) {
        await deleteImageByFilename(prevName);
      }
    }

    router.push("/admin/certificates");
    router.refresh();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServerError(null);
    const file = event.target.files?.[0] || null;

    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE) {
      setServerError("Image must be 2MB or less.");
      event.currentTarget.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setInitialImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-sm"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-slate-900"
        >
          Certificate Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. AWS Certified Solutions Architect"
          {...register("title")}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-900">
          Certificate Image
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
        >
          {previewUrl || initialImage ? (
            <>
              <Image
                src={getImageUrl(previewUrl || initialImage)}
                alt="Certificate preview"
                width={260}
                height={200}
                className="h-48 w-48 rounded-lg object-cover border border-slate-200"
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  clearSelection();
                }}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-red-50"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-slate-700">
                Click to upload image
              </p>
              <p className="text-xs text-slate-500">JPG, PNG, WebP · Max 2MB</p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-xs text-slate-500">Recommended size: 400×400px</p>
      </div>

      {serverError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700/90 disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {id
            ? isSubmitting
              ? "Updating..."
              : "Update Certificate"
            : isSubmitting
              ? "Creating..."
              : "Add Certificate"}
        </button>
      </div>
    </form>
  );
}
