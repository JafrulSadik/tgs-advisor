import { getClients } from "@/app/actions/client-action";
import { Plus } from "lucide-react";
import Link from "next/link";
import ClientActions from "./components/client-actions";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const formatDate = (date: string | Date) =>
  dateFormatter.format(typeof date === "string" ? new Date(date) : date);

export default async function ClientsPage() {
  const { data: clients } = await getClients();

  if (!clients) {
    return <div className="p-6">No clients found</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Clients</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your clients list</p>
        </div>
        <Link
          href="/admin/clients/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Client
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="h-[150px] text-center text-gray-500"
                  >
                    No clients found. Click &quot;Create Client&quot; to add
                    one.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {client.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {client.title}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {client.description}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <ClientActions id={client.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
