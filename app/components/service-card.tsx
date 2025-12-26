"use client";

import { serviceData } from "@/utils/service-data";
import { useState } from "react";
import Hexagon from "./hexagon";
import ServiceDetailsCard from "./service-details-card";

type ServiceCardProps = {
  serviceText: string;
  id: number;
  color: string;
  align: "left" | "right";
  tag: string;
};

export default function ServiceCard({
  id,
  serviceText,
  color,
  align,
  tag,
}: ServiceCardProps) {
  const [showService, setShowService] = useState(false);

  const service = serviceData.find((service) => service.tag === tag);

  const onSetShowService = (data: boolean) => {
    console.log({
      data,
    });
    setShowService(data);
  };

  if (!service) {
    return null;
  }

  return (
    <div
      onClick={() => onSetShowService(true)}
      className={`col-span-2 md:col-span-1  relative h-20 md:h-24 flex items-center ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`absolute z-20 h-full ${
          align === "right" ? "left-0" : "right-0"
        }`}
      >
        <div className="relative h-full hover:cursor-pointer">
          <Hexagon color={color} />
          <p className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold tracking-wider">
            {"0" + id}
          </p>
        </div>
      </div>

      <div
        className={`w-full md:w-full my-10 h-[80%] bg-[#DCDDDE] flex items-center hover:cursor-pointer ${
          align === "right"
            ? "justify-end ml-10 lg:ml-12 pl-10 lg:pl-12"
            : "justify-start mr-10 lg:mr-12 pr-10 lg:pr-12"
        }`}
        style={{
          clipPath:
            align === "right"
              ? "polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)"
              : "polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%)",
        }}
      >
        <div className={`w-full px-4 lg:px-8`}>
          <p className={`text-center md:text-lg lg:text-xl`}>{serviceText}</p>
        </div>
      </div>

      {showService && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue/40 backdrop-blur-sm"
        >
          <ServiceDetailsCard
            service={service}
            sequence={id}
            onSetShowService={onSetShowService}
          />
        </div>
      )}
    </div>
  );
}
