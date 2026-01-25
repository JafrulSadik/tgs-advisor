import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "./actions/about-action";
import { getServices } from "./actions/service-action";
import NotFoundContent from "./components/not-found-content";
import NotFoundHeader from "./components/not-found-header";

export default async function NotFound() {
  const { data: services } = await getServices();
  const { data: about } = await getAbout();

  if (!services || !about) {
    return (
      <div className="text-center text-red-500 min-h-screen flex justify-center items-center">
        Failed to load data!
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services} />
      <NotFoundHeader />
      <NotFoundContent />
      <Footer services={services} about={about} />
    </div>
  );
}
