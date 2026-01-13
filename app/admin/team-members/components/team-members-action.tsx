"use client";

import { deleteService } from "@/app/actions/service-action";
import Modal from "@/app/components/modal";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TeamMembersActions({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteService(id);
    if (result.success) {
      setShowModal(false);
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/team-members/${id}/edit`}
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
          title="Delete Team Member"
          description="Are you sure you want to delete this team member? This action cannot be undone."
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
