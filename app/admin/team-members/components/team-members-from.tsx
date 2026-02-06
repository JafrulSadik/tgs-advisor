"use client";

import { createTeamMember, updateTeamMember } from "@/app/actions/team-action";
import { teamCreateSchema, type TeamCreateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RichTextEditor } from "../../components/rich-text-editor";

type TeamMemberFormProps = {
  teamMember?: TeamCreateInput;
};

export function TeamMemberForm({ teamMember }: TeamMemberFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string>(
    teamMember?.image ?? "",
  );
  const MAX_SIZE = 2 * 1024 * 1024;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TeamCreateInput>({
    resolver: zodResolver(teamCreateSchema),
    defaultValues: {
      name: teamMember?.name ?? "",
      designation: teamMember?.designation ?? "",
      company: teamMember?.company ?? "",
      education: teamMember?.education ?? "",
      specialization: teamMember?.specialization ?? "",
      description: teamMember?.description ?? "",
      image: teamMember?.image ?? "",
    },
  });

  // initialImage is derived from props on first render

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads/team-members", {
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
      `/api/uploads/team-members?${
        filenameOrUrl.startsWith("/")
          ? `url=${encodeURIComponent(filenameOrUrl)}`
          : `filename=${encodeURIComponent(filenameOrUrl)}`
      }`,
      window.location.origin,
    );
    await fetch(url.toString(), { method: "DELETE" });
  };

  const onSubmit = async (data: TeamCreateInput) => {
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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Image upload failed.";
      setServerError(message);
      return;
    }

    let result;

    if (id) {
      result = await updateTeamMember(Number(id), data);
    } else {
      result = await createTeamMember(data);
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

      if (id && teamMember?.image && !initialImage) {
        await deleteImageByFilename(teamMember.image);
      }

      router.push("/admin/team-members");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 rounded-xl shadow-sm bg-[#FFFFFF]"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="e.g. John Doe"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="designation"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Designation
        </label>
        <input
          id="designation"
          type="text"
          {...register("designation")}
          placeholder="e.g. Senior Developer"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.designation && (
          <p className="text-xs text-red-500">{errors.designation.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          {...register("company")}
          placeholder="e.g. TechCorp Inc."
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.company && (
          <p className="text-xs text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="education"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Education
        </label>
        <input
          id="education"
          type="text"
          {...register("education")}
          placeholder="e.g. B.Sc in Computer Science"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.education && (
          <p className="text-xs text-red-500">{errors.education.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="specialization"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Specialization
        </label>
        <input
          id="specialization"
          type="text"
          {...register("specialization")}
          placeholder="e.g. Frontend Architecture"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.specialization && (
          <p className="text-xs text-red-500">
            {errors.specialization.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Bio / Description <span className="text-red-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Write a short bio..."
            />
          )}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-900">
          Profile Image
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative min-h-60 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
        >
          {/* Preview */}
          {previewUrl || initialImage ? (
            <>
              <Image
                src={previewUrl || initialImage}
                alt="Profile preview"
                width={240}
                height={240}
                className="h-40 w-40 rounded-xl object-cover border border-slate-200"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
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

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;

              if (!file) {
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
              }

              if (file.size > MAX_SIZE) {
                setServerError("Image must be 2MB or less.");
                e.currentTarget.value = "";
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
        <div className="p-3 rounded-md border border-red-200 text-sm text-red-600">
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
              : "Update Team Member"
            : isSubmitting
              ? "Creating..."
              : "Add Team Member"}
        </button>
      </div>
    </form>
  );
}
