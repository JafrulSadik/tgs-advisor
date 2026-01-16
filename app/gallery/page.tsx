import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getGalleryImages } from "../actions/gallery-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import ImageGrid from "./components/image-grid";

export default async function Gallery() {
  const { data: images } = await getGalleryImages();

  if (!images) {
    return <div>Failed to load gallery images</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Header title="Gallery" />
      <ImageGrid images={images} />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}
