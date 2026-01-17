"use client";

import { deleteCertification } from "@/app/actions/certification-action";
import Modal from "@/app/components/modal";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CertificatesAction({
  id,
  image,
}: {
  id: number;
  image?: string | null;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteImageByFilename = async (filenameOrUrl?: string) => {
    if (!filenameOrUrl) return;
    const url = new URL(
      `/api/uploads/certificates?${
        filenameOrUrl.startsWith("/")
          ? `url=${encodeURIComponent(filenameOrUrl)}`
          : `filename=${encodeURIComponent(filenameOrUrl)}`
      }`,
      window.location.origin
    );
    await fetch(url.toString(), { method: "DELETE" });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteCertification(id);
    if (result.success) {
      if (image) {
        await deleteImageByFilename(image);
      }
      setShowModal(false);
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/certificates/${id}/edit`}
        className="rounded p-2 text-blue-600 hover:bg-blue-50 transition-colors"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-2 text-red-600 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {showModal && (
        <Modal
          isDeleting={isDeleting}
          title="Delete Certificate"
          description="Are you sure you want to delete this certificate? This action cannot be undone."
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
