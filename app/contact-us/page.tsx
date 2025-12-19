import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ContactUsHeader from "./components/header";
import WaysToConnect from "./components/ways-to-connect";

export default function ContactUs() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <ContactUsHeader />
      <WaysToConnect />
      <Footer />
    </div>
  );
}
