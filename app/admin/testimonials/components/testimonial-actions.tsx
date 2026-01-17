"use client";

import { deleteTestimonial } from "@/app/actions/testimonials-action";
import Modal from "@/app/components/modal";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TestimonialActions({
  id,
  image,
}: {
  id: number;
  image?: string | null;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteImageByFilename = async (filenameOrUrl?: string | null) => {
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

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteTestimonial(id);
    if (result.success) {
      if (image) {
        await deleteImageByFilename(image);
      }
      setShowModal(false);
    } else if (result.error) {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/testimonials/${id}`}
        className="rounded p-2 text-blue-600 transition-colors hover:bg-blue-50"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-2 text-red-600 transition-colors hover:bg-red-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {showModal && (
        <Modal
          title="Delete Testimonial"
          description="Are you sure you want to delete this testimonial? This action cannot be undone."
          handleDelete={handleDelete}
          isDeleting={isDeleting}
          pendingText="Deleting..."
          confirmText="Delete"
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
