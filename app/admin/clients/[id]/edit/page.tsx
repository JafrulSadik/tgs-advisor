import { getClient } from "@/app/actions/client-action";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientForm } from "../../components/client-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientPage({ params }: PageProps) {
  const { id } = await params;
  const client = await getClient(Number(id));

  if (!client) {
    notFound();
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Edit Client</h1>
        <p className="mt-1 text-sm text-gray-600">Edit client details</p>
      </div>

      <div className="max-w-3xl">
        <ClientForm
          client={{
            title: client.title,
            description: client.description,
          }}
        />
      </div>
    </div>
  );
}
