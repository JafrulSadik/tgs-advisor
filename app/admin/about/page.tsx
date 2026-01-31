import { getAbout } from "@/app/actions/about-action";
import AboutDetailsForm from "./components/about-details-form";

export default async function AboutPage() {
  const { data: about } = await getAbout();

  if (!about) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Failed to fetch about data.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">About</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your about section</p>
      </div>
      <AboutDetailsForm
        about={
          about
            ? {
                email: about.email ?? undefined,
                phone: about.phone ?? undefined,
                whatsapp: about.whatsapp ?? undefined,
                address: about.address ?? undefined,
                facebook: about.facebook ?? undefined,
                linkedin: about.linkedin ?? undefined,
                youtube: about.youtube ?? undefined,
              }
            : undefined
        }
      />
    </div>
  );
}
