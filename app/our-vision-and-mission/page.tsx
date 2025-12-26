import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import FloatingWhatsapp from "../components/floating-whatsapp";
import OurVision from "./components/our-vision";

export default function OurVisionAndMission() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Vision and Mission" />
      <OurVision />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}
