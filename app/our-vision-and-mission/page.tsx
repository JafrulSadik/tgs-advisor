import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getServices } from "../actions/service-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import OurVision from "./components/our-vision";

export default async function OurVisionAndMission() {
  const { data: about } = await getAbout();
  const { data: services } = await getServices();

  if (!about || !services) {
    return <div>Failed to load data!</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services} />
      <Header title="Vision and Mission" />
      <OurVision />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
