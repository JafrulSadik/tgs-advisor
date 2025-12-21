import FaqLeft from "./faq-left";
import FaqRight from "./faq-right";

export default function FaqSection() {
  return (
    <section className="flex justify-center py-5 md:py-5 bg-body">
      <div className="md:p-15 flex w-[90%] max-w-7xl justify-center rounded-3xl bg-blue p-10 md:rounded-4xl">
        <div className="max-w-5xl grid grid-cols-12 gap-5 md:gap-10">
          <FaqLeft />
          <FaqRight />
        </div>
      </div>
    </section>
  );
}
