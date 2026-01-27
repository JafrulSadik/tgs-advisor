import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "./actions/about-action";
import { getCertifications } from "./actions/certification-action";
import { getServices } from "./actions/service-action";
import { getTestimonials } from "./actions/testimonials-action";
import AwardsAndCertificates from "./components/awards-and-certificates";
import ClientFeedback from "./components/client-feedback";
import CoreServices from "./components/core-services";
import FaqSection from "./components/faq-section";
import FloatingWhatsapp from "./components/floating-whatsapp";
import GallerySection from "./components/gallery";
import Hero from "./components/hero";
import HowWeApproch from "./components/how-we-approch";
import PartnerWithUs from "./components/partner-with-us";
import WhatWeDo from "./components/what-we-do";
import WhyChooseUs from "./components/why-choose-us";

export const runtime = "nodejs";

export default async function Home() {
  const { data: about } = await getAbout();
  const { data: certificates } = await getCertifications();
  const { data: testimonials } = await getTestimonials();
  const { data: services } = await getServices();

  if (!about || !certificates || !testimonials || !services) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Failed to fetch about data.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services} />
      <Hero />
      <WhatWeDo />
      <CoreServices services={services} />
      <ClientFeedback testimonials={testimonials} />
      <HowWeApproch />
      <GallerySection />
      <WhyChooseUs />
      <FaqSection />
      <PartnerWithUs services={services} />
      <AwardsAndCertificates certificates={certificates} />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
