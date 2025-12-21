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
        "Our solutions are designed for RMG factories, textile mills, manufacturing units, BPO/ITES companies, corporate HR teams, leadership groups, and business owners looking to improve efficiency, strengthen internal systems, or scale with global standards.",
    },
    {
      question: "Do you provide on-site and off-site training programs?",
      answer:
        "Yes. TGS Advisor provides factory-floor training, management-level workshops, leadership programs, and customized skill-development sessions both on-site and virtually. Programs are tailored to a client’s operations, maturity level, and performance goals.",
    },
    {
      question: "How does TGS Advisor approach process impovement?",
      answer: `We use a data-driven, root-cause-first methodology. Our specialists assess the current workflow end to end—planning, IE, supply chain, HR, compliance, and financial structure—then redesign systems to improve efficiency, reduce waste, and unlock measurable productivity gains.`,
    },
    {
      question:
        "Can TGS Advisor help with complete organization restructuring or KPI system?",
      answer:
        "Absolutely. Our experts have implemented KPI frameworks, OKR systems, succession planning, HR restructuring, planning architecture, and SOP development for leading organizations. We ensure implementation is practical, scalable, and aligned with your long-term objectives.",
    },
    {
      question: "How can I get started with TGS Advisor?",
      answer:
        "You can contact us through our website’s inquiry form or email. We begin with a short consultation to understand your challenges, goals, and operational context. Based on that, we propose a tailored action plan, timeline, and engagement model that fits your requirements.",
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
