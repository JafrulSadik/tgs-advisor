import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getServices } from "../actions/service-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import About from "./components/about";

export default async function WhoWeAre() {
  const { data: about } = await getAbout();
  const { data: services } = await getServices();

  if (!about || !services) {
    return <div>Failed to load data!</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Who We Are" />
      <About />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
