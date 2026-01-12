import { ServiceForm } from "@/app/admin/components/ServiceForm";

export default function CreateServicePage() {
  return (
    <div className="mx-auto  px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create New Service
        </h1>
        <p className="mt-2 text-gray-600">
          Add a new service to your portfolio.
        </p>
      </div>
      <ServiceForm />
    </div>
  );
}
