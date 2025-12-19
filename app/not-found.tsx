import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import NotFoundContent from "./components/not-found-content";
import NotFoundHeader from "./components/not-found-header";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <NotFoundHeader />
      <NotFoundContent />
      <Footer />
    </div>
  );
}
