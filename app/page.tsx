import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import AwardsAndCertificates from "./components/awards-and-certificates";
import CoreServices from "./components/core-services";
import FaqSection from "./components/faq-section";
import Hero from "./components/hero";
import HowWeApproch from "./components/how-we-approch";
import PartnerWithUs from "./components/partner-with-us";
import WhatWeDo from "./components/what-we-do";
import WhyChooseUs from "./components/why-choose-us";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <CoreServices />
      <HowWeApproch />
      <WhyChooseUs />
      <FaqSection />
      <PartnerWithUs />
      <AwardsAndCertificates />
      <Footer />
    </div>
  );
}
