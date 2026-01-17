"use client";

import {
  createTestimonial,
  updateTestimonial,
} from "@/app/actions/testimonials-action";
import {
  testimonialCreateSchema,
  type TestimonialCreateInput,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface TestimonialFormProps {
  testimonial?: TestimonialCreateInput;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const params = useParams<{ id?: string }>();
  const id = params?.id;
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState(
    testimonial?.clientImage ?? "",
  );
  const MAX_SIZE = 2 * 1024 * 1024;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialCreateInput>({
    resolver: zodResolver(testimonialCreateSchema),
    defaultValues: {
      clientName: testimonial?.clientName ?? "",
      clientDesignation: testimonial?.clientDesignation ?? "",
      clientCompany: testimonial?.clientCompany ?? "",
      clientImage: testimonial?.clientImage ?? "",
      review: testimonial?.review ?? "",
    },
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads/testimonials", {
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
    const url = new URL(
      `/api/uploads/testimonials?${
        filenameOrUrl.startsWith("/")
          ? `url=${encodeURIComponent(filenameOrUrl)}`
          : `filename=${encodeURIComponent(filenameOrUrl)}`
      }`,
      window.location.origin,
    );
    await fetch(url.toString(), { method: "DELETE" });
  };

  const onSubmit = async (data: TestimonialCreateInput) => {
    setServerError(null);

    let uploaded: { url: string; filename: string } | null = null;
    try {
      if (selectedFile) {
        if (selectedFile.size > MAX_SIZE) {
          setServerError("Image must be 2MB or less.");
          return;
        }
        uploaded = await uploadImage(selectedFile);
        data.clientImage = uploaded.url;
      } else {
        data.clientImage = initialImage || "";
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Image upload failed.";
      setServerError(message);
      return;
    }

    let result;
    if (id) {
      result = await updateTestimonial(Number(id), data);
    } else {
      result = await createTestimonial(data);
    }

    if (result?.error) {
      setServerError(result.error);
      if (uploaded?.filename) {
        await deleteImageByFilename(uploaded.filename);
      }
      return;
    }

    if (result?.success) {
      if (
        id &&
        uploaded?.filename &&
        initialImage &&
        initialImage !== uploaded.url
      ) {
        const prevName = initialImage.split("/").pop();
        if (prevName) {
          await deleteImageByFilename(prevName);
        }
      }

      if (id && testimonial?.clientImage && !initialImage) {
        await deleteImageByFilename(testimonial.clientImage);
      }

      router.push("/admin/testimonials");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-white p-8 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="clientName"
            className="text-sm font-semibold text-slate-900"
          >
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            id="clientName"
            type="text"
            {...register("clientName")}
            placeholder="e.g. John Doe"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.clientName && (
            <p className="text-xs text-red-500">{errors.clientName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="clientDesignation"
            className="text-sm font-semibold text-slate-900"
          >
            Designation
          </label>
          <input
            id="clientDesignation"
            type="text"
            {...register("clientDesignation")}
            placeholder="e.g. Managing Director"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.clientDesignation && (
            <p className="text-xs text-red-500">
              {errors.clientDesignation.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="clientCompany"
            className="text-sm font-semibold text-slate-900"
          >
            Company
          </label>
          <input
            id="clientCompany"
            type="text"
            {...register("clientCompany")}
            placeholder="e.g. Acme Corp"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.clientCompany && (
            <p className="text-xs text-red-500">
              {errors.clientCompany.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="review"
          className="text-sm font-semibold text-slate-900"
        >
          Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review"
          rows={5}
          {...register("review")}
          placeholder="Write the client's feedback..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.review && (
          <p className="text-xs text-red-500">{errors.review.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-900">
          Client Image
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
        >
          {previewUrl || initialImage ? (
            <>
              <Image
                src={previewUrl || initialImage}
                alt="Client preview"
                width={240}
                height={240}
                className="h-40 w-40 rounded-xl border border-slate-200 object-cover"
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setInitialImage("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
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
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              if (!file) {
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
              }

              if (file.size > MAX_SIZE) {
                setServerError("Image must be 2MB or less.");
                event.currentTarget.value = "";
                return;
              }

              setSelectedFile(file);
              setPreviewUrl(URL.createObjectURL(file));
            }}
          />
        </div>
        <p className="text-xs text-slate-500">Recommended size: 400×400px</p>
      </div>

      {serverError && (
        <div className="rounded-md border border-red-200 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800/80 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {id
            ? isSubmitting
              ? "Updating..."
              : "Update Testimonial"
            : isSubmitting
              ? "Creating..."
              : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
}
