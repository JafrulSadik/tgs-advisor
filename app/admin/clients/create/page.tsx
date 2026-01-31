import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ClientForm } from "../components/client-form";

export default function CreateClientPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <Link
          href="/admin/clients"
          className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Clients
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create Client</h1>
        <p className="mt-1 text-sm text-gray-600">
          Add a new client to your list
        </p>
      </div>

      <div className="max-w-3xl">
        <ClientForm />
      </div>
    </div>
  );
}
