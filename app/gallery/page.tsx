import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import ImageGrid from "./components/image-grid";

export default function Gallery() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Gallery" />
      <ImageGrid />
      <Footer />
    </div>
  );
}
