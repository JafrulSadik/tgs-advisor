"use client";
import { ServiceData } from "@/utils/service-data";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ServiceForm from "./service-form";

export default function ServiceDetailsCard({
  service,
  sequence,
  onSetShowService,
}: {
  service: ServiceData;
  sequence: number;
  onSetShowService: (data: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleClose = () => {
    setCurrentStep(1);
    onSetShowService(false);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  return (
    <>
      {currentStep === 1 ? (
        <div id={service.tag}>
          <div className="relative w-[90%] md:w-full max-w-5xl mx-auto">
            <button
              onClick={handleClose}
              className="z-50 right-1 md:right-4 top-2 absolute text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>

            <div className="absolute w-[80%] lg:min-w-[35%] md:w-auto -top-[4.5%] md:-top-[4%] right-1/2 translate-x-1/2 lg:-translate-x-2/20 z-30">
              <div
                className={`relative text-white flex items-center font-semibold px-4 h-14 text-xs md:text-base lg:px-6 rounded-b-xl ${
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

            {/* Card Content */}
            <div
              className={`z-20 relative pt-14 px-5 md:px-10 pb-8 rounded-xl md:rounded-3xl space-y-5 ${
                sequence % 2 === 0 ? "bg-[#D9EFF8]" : "bg-[#CBDCFD]"
              }`}
            >
              {/* Step 1: Service Details */}
              {currentStep === 1 && (
                <>
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
                    <span className="font-semibold">Outcome:</span>{" "}
                    {service.outcome}
                  </p>

                  <div className="flex justify-center md:justify-end">
                    <button
                      onClick={handleNextStep}
                      className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-full 
                    text-white ${
                      sequence % 2 === 0
                        ? "bg-linear-to-t from-[#006489] to-[#00AEEF] hover:from-[#00AEEF] hover:to-[#006489]"
                        : "bg-linear-to-t from-[#2971F4] to-[#154191] hover:from-[#154191] hover:to-[#2971F4]"
                    } transition-colors duration-500`}
                    >
                      <span className="ml-2 text-xs md:text-sm">
                        {service.button}
                      </span>
                      <span className="bg-white p-1 rounded-full">
                        <FaArrowRight className="text-[#006489] -rotate-35" />
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`overflow-y-auto ${
            sequence % 2 === 0 ? "bg-[#D9EFF8]" : "bg-[#CBDCFD]"
          } backdrop-blur-sm rounded-xl p-4 max-w-3xl w-[90%]`}
        >
          <div className="flex justify-between w-full pt-4 px-2 pb-2 lg:pb-0 md:px-6">
            <button
              onClick={handleBack}
              className=" text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm hidden md:inline">Back</span>
            </button>

            <button
              onClick={handleClose}
              className="z-50 right-1 md:right-4 top-2 absolute text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>
          </div>
          <ServiceForm serviceTag={service.tag} />
        </div>
      )}
    </>
  );
}
