import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getCertifications } from "../actions/certification-action";
import { getClients } from "../actions/client-action";
import { getServices } from "../actions/service-action";
import { getTestimonials } from "../actions/testimonials-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import ClientProjects from "./components/client-projects";

export default async function OurClientProjectsPage() {
  const { data: about } = await getAbout();
  const { data: certificates } = await getCertifications();
  const { data: testimonials } = await getTestimonials();
  const { data: services } = await getServices();
  const { data: clients } = await getClients();

  if (!about || !certificates || !testimonials || !services || !clients)
    return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services} />
      <Header title="Our Clients" />
      <ClientProjects clients={clients} />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
