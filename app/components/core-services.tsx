import { ServiceType } from "../types/service";
import ServiceCard from "./service-card";

export default async function CoreServices({
  services,
}: {
  services: ServiceType[];
}) {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden">
      <div className="relative w-full">
        <div className="flex justify-center">
          <div className="relative z-20 py-2 md:py-3 px-8 md:px-14 w-auto bg-blue rounded-[14px] md:rounded-2xl my-15 md:my-18 flex justify-center">
            <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
              Core Services
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-5xl w-full grid grid-cols-2 gap-4">
        {services.length > 0 &&
          services.map((service, i) => (
            <ServiceCard
              key={i}
              id={i + 1}
              align={i % 2 === 0 ? "right" : "left"}
              service={service}
              services={services}
            />
          ))}
      </div>
    </div>
  );
}
