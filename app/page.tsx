import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "./actions/about-action";
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

export default async function Home() {
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
      <Hero />
      <WhatWeDo />
      <CoreServices />
      <ClientFeedback />
      <HowWeApproch />
      <GallerySection />
      <WhyChooseUs />
      <FaqSection />
      <PartnerWithUs />
      <AwardsAndCertificates />
      <FloatingWhatsapp />
      <Footer about={about} />
    </div>
  );
}
