import { getGalleryImages } from "@/app/actions/gallery-action";
import { GalleryBoard } from "@/app/admin/gallery/components/gallery-board";
import { galleryLimit } from "@/config/config";
import { ImageIcon, Plus } from "lucide-react";
import Link from "next/link";

export default async function GalleryPage() {
  const { data: galleryImages = [], error } = await getGalleryImages();
  const remainingSlots = galleryLimit - galleryImages.length;

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Media Library
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Gallery Images</h1>
          <p className="mt-2 text-sm text-slate-500">
            Upload up to {galleryLimit} curated images. Drag cards to update the
            order shown on the site.
          </p>
        </div>

        {remainingSlots > 0 && (
          <Link
            href="/admin/gallery/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Add Image
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-normal">
              {remainingSlots} left
            </span>
          </Link>
        )}
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {galleryImages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">
            No images yet
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Start by uploading your first gallery image.
          </p>
          {remainingSlots > 0 && (
            <Link
              href="/admin/gallery/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              <Plus className="h-4 w-4" /> Upload Image
            </Link>
          )}
        </div>
      ) : (
        <GalleryBoard initialImages={galleryImages} limit={galleryLimit} />
      )}

      {remainingSlots <= 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Gallery limit reached. Delete an image to add a new one.
        </div>
      )}
    </div>
  );
}
