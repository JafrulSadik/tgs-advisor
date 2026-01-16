"use client";

import { createGalleryImage } from "@/app/actions/gallery-action";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

type UploadState = "idle" | "uploading" | "uploaded" | "error";

export function GalleryUploadForm({
  remainingSlots,
}: {
  remainingSlots: number;
}) {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const uploadImage = async (file: File) => {
    setUploadState("uploading");
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads/gallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data?.success) {
      throw new Error(data?.error ?? "Failed to upload image");
    }

    setUploadState("uploaded");
    setUploadedUrl(data.url);
    setUploadedFilename(data.filename);
  };

  const deleteUploadedImage = async () => {
    const filenameOrUrl = uploadedFilename ?? uploadedUrl;
    if (!filenameOrUrl) return;
    const target = filenameOrUrl.split("/").pop();
    const query = target
      ? `filename=${encodeURIComponent(target)}`
      : `url=${encodeURIComponent(filenameOrUrl)}`;
    await fetch(`/api/uploads/gallery?${query}`, { method: "DELETE" });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      setUploadedFilename(null);
      setUploadState("idle");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Image must be 2MB or less.");
      event.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));

    try {
      if (uploadedUrl || uploadedFilename) {
        await deleteUploadedImage();
      }
      await uploadImage(file);
    } catch (err) {
      setUploadState("error");
      setUploadedUrl(null);
      setUploadedFilename(null);
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleRemoveImage = async () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    await deleteUploadedImage();
    setPreviewUrl(null);
    setUploadedUrl(null);
    setUploadedFilename(null);
    setUploadState("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!uploadedUrl || !name.trim()) {
      setError("Provide a name and upload an image first.");
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await createGalleryImage({
      name: name.trim(),
      image: uploadedUrl,
    });
    if (result?.error) {
      setError(result.error);
      setIsSaving(false);
      return;
    }

    router.push("/admin/gallery");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Slots available: {remainingSlots}
        </p>
        <label className="block text-sm font-semibold text-slate-900">
          Image title
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Modern Workspace"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="text-xs text-slate-500">
          Give the image a descriptive label.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          Upload image
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Preview"
                width={480}
                height={320}
                className="h-60 w-full rounded-2xl object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow">
                <Upload className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-base font-semibold text-slate-900">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-slate-500">JPG, PNG, WebP — Max 2MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {uploadState === "uploading" && (
            <div className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-slate-700 shadow">
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />{" "}
              Uploading...
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Recommended ratio 4:3 or 3:2 for best fit.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {uploadState === "uploaded" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Image uploaded successfully. Click save to publish.
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/gallery")}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving || uploadState !== "uploaded"}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Save Image"
          )}
        </button>
      </div>
    </form>
  );
}
