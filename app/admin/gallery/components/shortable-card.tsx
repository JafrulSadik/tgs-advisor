"use client";

import { getImageUrl } from "@/lib/image-url";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { CSSProperties } from "react";
import { GalleryImage } from "./gallery-board";

type SortableCardProps = {
  image: GalleryImage;
  onDelete: (image: GalleryImage) => void;
  deleting: boolean;
  isActive: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  setSelectedImage: (image: number | null) => void;
};

export default function SortableCard({
  image,
  deleting,
  // isActive,
  setShowDeleteModal,
  setSelectedImage,
}: SortableCardProps) {
  const {
    // attributes,
    // listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-6/3 w-full">
        <Image
          src={getImageUrl(image.image) || "/placeholder.svg"}
          alt={image.name}
          fill
          className={`object-cover transition ${
            isDragging ? "scale-105 opacity-80" : ""
          }`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {/* <button
          type="button"
          {...listeners}
          {...attributes}
          className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow transition ${
            isDragging || isActive
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <GripVertical className="h-4 w-4" /> Drag
        </button> */}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">
            #{image.sequence.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {image.name}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowDeleteModal(true);
            setSelectedImage(image.id);
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          disabled={deleting}
        >
          {deleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Removing...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" /> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
