import { getGalleryImages } from "@/app/actions/gallery-action";
import { GalleryUploadForm } from "@/app/admin/gallery/components/gallery-upload-form";
import { galleryLimit } from "@/config/config";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function GalleryUploadPage() {
  const { data: galleryImages = [] } = await getGalleryImages();
  const remainingSlots = Math.max(galleryLimit - galleryImages.length, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Upload
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Gallery Image
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Choose an image, preview it instantly, then save to publish.
          </p>
        </div>
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back to gallery
        </Link>
      </header>

      <GalleryUploadForm remainingSlots={remainingSlots} />
    </div>
  );
}
