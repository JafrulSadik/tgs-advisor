import { getTestimonials } from "@/app/actions/testimonials-action";
import { getImageUrl } from "@/lib/image-url";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TestimonialActions from "./components/testimonial-actions";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const formatDate = (date: string | Date) =>
  dateFormatter.format(typeof date === "string" ? new Date(date) : date);

const truncate = (text: string, length = 100) =>
  text.length > length ? `${text.slice(0, length)}…` : text;

export default async function TestimonialsPage() {
  const { data: testimonials, error } = await getTestimonials();

  if (!testimonials || error) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load testimonials. Please try again later.
      </div>
    );
  }

  const items = testimonials ?? [];

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage what clients are saying about you
          </p>
        </div>
        <Link
          href="/admin/testimonials/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
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
                  Client
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Review
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
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-[150px] text-center text-gray-500"
                  >
                    No testimonials yet. Click &quot;Add Testimonial&quot; to
                    create one.
                  </td>
                </tr>
              ) : (
                items.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{testimonial.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {testimonial.clientImage ? (
                          <Image
                            src={getImageUrl(testimonial.clientImage)}
                            alt={testimonial.clientName}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {testimonial.clientName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {testimonial.clientCompany || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs uppercase text-gray-600">
                        {testimonial.clientDesignation || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {truncate(testimonial.review)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(testimonial.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <TestimonialActions
                        id={testimonial.id}
                        image={testimonial.clientImage}
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
