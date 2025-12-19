import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import About from "./components/about";

export default function WhoWeAre() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Who We Are" />
      <About />
      <Footer />
    </div>
  );
}
