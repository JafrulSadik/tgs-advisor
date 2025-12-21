"use client";
import { ServiceData } from "@/utils/service-data";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ServiceForm from "./service-form";

type ServiceCardProps = {
  sequence: number;
  service: ServiceData;
};

export default function ServiceCard({ service, sequence }: ServiceCardProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div id={service.tag} className="pt-20">
      <div className="relative max-w-5xl mx-auto">
        {/* Title badge */}
        <div className="absolute w-[80%] lg:min-w-[35%] md:w-auto -top-[4.5%] md:-top-[4%] right-1/2 translate-x-1/2 lg:-translate-x-2/20 z-30">
          <div
            className={`relative text-white flex items-center font-semibold px-4 h-14 text-xs md:text-base lg:px-6  rounded-b-xl ${
              sequence % 2 === 0 ? "bg-[#00AEEF]" : "bg-[#17479E]"
            }`}
          >
            {service.title}
            <span
              className={`z-10 absolute -left-5 top-0 w-0 h-0 
        border-t-20 border-t-transparent
        border-b-0 border-b-transparent
        border-r-20 border-r-[#0078A6]`}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className={`z-20 relative pt-14 px-5 md:px-10 pb-8 rounded-xl md:rounded-3xl space-y-5 ${
            sequence % 2 === 0 ? "bg-[#D9EFF8]" : "bg-[#CBDCFD]"
          }`}
        >
          <p className="text-sm md:text-base">{service.description}</p>

          <div className="text-sm md:text-base">
            <h4 className="font-bold mb-3">{service.pointsTitle}</h4>
            <ul className="space-y-2">
              {service.points.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 bg-black rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm md:text-base">
            <span className="font-semibold">Outcome:</span> {service.outcome}
          </p>

          <div className="flex justify-center md:justify-end">
            <button
              onClick={() => setShowForm(true)}
              className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-full 
        text-white ${
          sequence % 2 === 0
            ? "bg-linear-to-t from-[#006489] to-[#00AEEF] hover:from-[#00AEEF] hover:to-[#006489]"
            : "bg-linear-to-t from-[#2971F4] to-[#154191] hover:from-[#154191] hover:to-[#2971F4]"
        } transition-colors duration-500`}
            >
              <span className="ml-2 text-xs md:text-sm">{service.button}</span>
              <span className="bg-white p-1 rounded-full">
                <FaArrowRight className="text-[#006489] -rotate-35" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue/40 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>

            <div className="overflow-y-auto">
              <ServiceForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
