import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getServices } from "../actions/service-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import ContactUsHeader from "./components/header";
import WaysToConnect from "./components/ways-to-connect";

export default async function ContactUs() {
  const { data: about } = await getAbout();
  const { data: services } = await getServices();

  if (!about || !services) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Failed to fetch about data.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services} />
      <ContactUsHeader />
      <WaysToConnect />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
