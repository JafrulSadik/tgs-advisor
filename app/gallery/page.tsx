import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { getAbout } from "../actions/about-action";
import { getGalleryImages } from "../actions/gallery-action";
import { getServices } from "../actions/service-action";
import FloatingWhatsapp from "../components/floating-whatsapp";
import ImageGrid from "./components/image-grid";

export default async function Gallery() {
  const { data: images } = await getGalleryImages();
  const { data: about } = await getAbout();
  const { data: services } = await getServices();

  if (!images || !about || !services) {
    return <div>Failed to load data!</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar services={services || []} />
      <Header title="Gallery" />
      <ImageGrid images={images} />
      <FloatingWhatsapp whatsappNumber={about.whatsapp || ""} />
      <Footer about={about} services={services} />
    </div>
  );
}
