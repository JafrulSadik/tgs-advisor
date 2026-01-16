import { AlertTriangle } from "lucide-react";

type ModalProps = {
  title?: string;
  description?: string;
  isDeleting?: boolean;
  pendingText?: string;
  confirmText?: string;
  handleDelete: () => void;
  setShowModal: (show: boolean) => void;
  onCancel?: () => void;
};

export default function Modal({
  title = "Delete Service",
  description = "Are you sure you want to delete this service? This action cannot be undone.",
  isDeleting = false,
  pendingText = "Deleting...",
  confirmText = "Delete",
  handleDelete,
  setShowModal,
  onCancel = () => {},
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center justify-end gap-3 bg-gray-50 px-6 py-4">
          <button
            onClick={() => {
              onCancel();
              setShowModal(false);
            }}
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
            {isDeleting ? pendingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
