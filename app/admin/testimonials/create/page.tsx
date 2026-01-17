"use client";

import { TestimonialForm } from "../components/testimonial-form";

export default function CreateTestimonialPage() {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add Testimonial
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Share what your clients are saying about your work.
        </p>
      </div>
      <TestimonialForm />
    </div>
  );
}
