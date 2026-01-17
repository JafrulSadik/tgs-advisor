import { getTestimonial } from "@/app/actions/testimonials-action";
import NotFoundSign from "@/app/components/not-found-sign";
import { TestimonialForm } from "../components/testimonial-form";

export default async function UpdateTestimonials({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <NotFoundSign />;
  }

  const { data: testimonial } = await getTestimonial(Number(id));

  if (!testimonial) {
    return <NotFoundSign description="Testimonial not found." />;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit Testimonial #{id}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Update the testimonial details below.
        </p>
      </div>
      <TestimonialForm
        testimonial={{
          clientName: testimonial.clientName,
          clientDesignation: testimonial.clientDesignation ?? "",
          clientCompany: testimonial.clientCompany ?? "",
          clientImage: testimonial.clientImage ?? "",
          review: testimonial.review,
        }}
      />
    </div>
  );
}
