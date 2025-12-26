import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import FloatingWhatsapp from "../components/floating-whatsapp";
import IndustrySpecialist from "./components/industry-specialist";
import WorkWithOurExparts from "./components/work-with-our-exparts";

export default function OurTeam() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Our Team" />
      <IndustrySpecialist />
      <WorkWithOurExparts />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}
