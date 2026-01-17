import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import ContactUsHeader from "./components/header";
import WaysToConnect from "./components/ways-to-connect";

export default async function ContactUs() {
  const { data: about } = await getAbout();

  if (!about) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Failed to fetch about data.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <ContactUsHeader />
      <WaysToConnect />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} />
    </div>
  );
}
