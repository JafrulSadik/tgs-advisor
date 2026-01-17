import { CertificateForm } from "../components/certificate-form";

export default function CreateCertificatePage() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add Certificate
        </h1>
      </div>
      <CertificateForm />
    </div>
  );
}
