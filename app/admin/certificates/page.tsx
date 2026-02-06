import { getCertifications } from "@/app/actions/certification-action";
import { getImageUrl } from "@/lib/image-url";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CertificatesAction from "./components/certificates-action";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const formatDate = (date: string | Date) =>
  dateFormatter.format(typeof date === "string" ? new Date(date) : date);

export default async function CertificatesPage() {
  const { data: certificates } = await getCertifications();

  if (!certificates) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your certificates list
          </p>
        </div>
        <Link
          href="/admin/certificates/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Certificate
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
                  Image
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
              {certificates.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="h-[150px] text-center text-gray-500"
                  >
                    No certificates found. Click &quot;Add Certificate&quot; to
                    add one.
                  </td>
                </tr>
              ) : (
                certificates.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      {item.image ? (
                        <Image
                          src={getImageUrl(item.image) || "/placeholder.svg"}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-md object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 rounded-md" />
                      )}
                    </td>
                    <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4">
                      <CertificatesAction
                        id={Number(item.id)}
                        image={item.image}
                      />
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
