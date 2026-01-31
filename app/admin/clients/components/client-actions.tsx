"use client";

import { deleteClient } from "@/app/actions/client-action";
import { AlertTriangle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ClientActions({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteClient(id);
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
        href={`/admin/clients/${id}/edit`}
        className="rounded p-2 text-blue-600 hover:bg-blue-50 transition-colors"
        title="Edit Client"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-2 text-red-600 hover:bg-red-50 transition-colors"
        title="Delete Client"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3 text-amber-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Client
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this client? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
