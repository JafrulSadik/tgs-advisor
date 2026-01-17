import { getCertification } from "@/app/actions/certification-action";
import NotFoundSign from "@/app/components/not-found-sign";
import { CertificateForm } from "../../components/certificate-form";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <NotFoundSign />;
  }

  const { data: certificate } = await getCertification(Number(id));

  if (!certificate) {
    return <NotFoundSign description="Certificate not found." />;
  }

  return (
    <div className="mx-auto  px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit Certificate {id}
        </h1>
      </div>
      <CertificateForm
        certificate={{
          title: certificate.title,
          image: certificate.image ?? "",
        }}
      />
    </div>
  );
}
