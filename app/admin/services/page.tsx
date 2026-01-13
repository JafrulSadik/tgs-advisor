import { getServices } from "@/app/actions/service-action";
import { Plus } from "lucide-react";
import Link from "next/link";
import ServiceActions from "./components/service-actions";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your services list
          </p>
        </div>
        <Link
          href="/admin/services/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Service
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
                  Color
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
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No services found. Click &quot;Create Service&quot; to add
                    one.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {service.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {service.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded border border-gray-200 shadow-sm"
                          style={{ backgroundColor: service.color }}
                        />
                        <span className="font-mono text-xs uppercase">
                          {service.color}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <ServiceActions id={service.id} />
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
