import { serviceData } from "@/utils/service-data";
import ServiceCard from "./service-card";

export default function Services() {
  return (
    <div className="my-10 md:my-15">
      <h2 className="md:text-xl text-center max-w-[90%] lg:max-w-5xl mx-auto">
        TGS Advisor provides specialized consulting and capability development
        across different sectors, helping organizations strengthen performance,
        control costs, develop people and build globally aligned systems.
      </h2>

      <div className="flex justify-center">
        <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-xl md:rounded-2xl mt-10 flex justify-center">
          <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
            Our Services
          </h2>
        </div>
      </div>

      <div className="max-w-[90%] lg:max-w-5xl mx-auto">
        {serviceData.map((service, i) => (
          <ServiceCard key={service.title} service={service} sequence={i + 1} />
        ))}
      </div>
    </div>
  );
}
