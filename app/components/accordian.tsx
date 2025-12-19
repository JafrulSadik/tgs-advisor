"use client";

import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      question: "What Services does TGS Advisor provide?",
      answer: `TGS Advisor Delivers end to end consulting across RMG
textile, HR development, and business optimisation. Our
services include production improvement, process 
optimisatio, capacity planning, HR & leadership development,
organizational restructuring, KPI impemetation, complicance
driven operations, and strategic business advisory.`,
    },
    {
      question: "Who can benefit from TGS Advisor’s consultancy?",
      answer:
        "Yes, we arrange online meeting for all clients, allowing easy access to our team and services from any location.",
    },
    {
      question: "Do you provide on site  and off site training programs?",
      answer:
        "Yes, we arrange online meeting for all clients, allowing easy access to our team and services from any location.",
    },
    {
      question: "How does TGS Advisor approach process impovement?",
      answer:
        "Yes, we arrange online meeting for all clients, allowing easy access to our team and services from any location.",
    },
    {
      question:
        "Can TGS Advisor help with complete organization restructuring or KPI system?",
      answer:
        "Yes, we arrange online meeting for all clients, allowing easy access to our team and services from any location.",
    },
    {
      question: "How can I get started with TGS Advisor?",
      answer:
        "Yes, we arrange online meeting for all clients, allowing easy access to our team and services from any location.",
    },
  ];

  return (
    <div className="gap-10">
      {items.map((item, index) => (
        <div key={index} className="mb-5 border-b border-[#EED39F]">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex w-full items-center justify-between pb-5 text-left text-base font-bold text-white md:text-xl"
          >
            {item.question}
            <span className="text-base md:text-xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          <div
            className={`overflow-hidden text-sm text-[#F4F4F4] transition-all duration-300 md:text-base ${
              openIndex === index ? "max-h-40 pb-2" : "max-h-0 p-0"
            }`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
