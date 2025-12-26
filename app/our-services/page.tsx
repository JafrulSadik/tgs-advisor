import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import FloatingWhatsapp from "../components/floating-whatsapp";
import Services from "./components/services";

export default function OurServices() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Our Services" />
      <Services />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}
