import { getService } from "@/app/actions/service-action";
import NotFoundSign from "@/app/components/not-found-sign";
import { ServiceForm } from "../../components/service-form";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <NotFoundSign />;
  }

  const service = await getService(Number(id));

  if (!service) {
    return <NotFoundSign description="Service not found." />;
  }

  return (
    <div className="mx-auto  px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit Service {id}
        </h1>
        <p className="mt-2 text-gray-600">
          This is a placeholder for the edit service page.
        </p>
      </div>
      <ServiceForm
        service={{
          title: service.title,
          description: service.description,
          color: service.color,
        }}
      />
    </div>
  );
}
