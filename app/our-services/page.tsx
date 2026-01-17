import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getServices } from "../actions/service-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import Services from "./components/services";

export default async function OurServices() {
  const { data: about } = await getAbout();
  const { data: services } = await getServices();

  if (!about || !services) {
    return <div>Failed to load data!</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Our Services" />
      <Services />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
