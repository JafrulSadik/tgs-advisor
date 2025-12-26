"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    question: "What Services does TGS Advisor provide?",
    answer: `TGS Advisor Delivers end to end consulting across RMG textile, HR development and business optimisation. Our
services include production improvement, process optimisatio, capacity planning, HR & leadership development, organizational restructuring, KPI impemetation, complicance driven operations and strategic business advisory.`,
  },
  {
    question: "Who can benefit from TGS Advisor’s consultancy?",
    answer:
      "Our solutions are designed for RMG factories, textile mills, manufacturing units, BPO/ITES companies, corporate HR teams, leadership groups and business owners looking to improve efficiency, strengthen internal systems, or scale with global standards.",
  },
  {
    question: "Do you provide on site and off site training programs?",
    answer:
      "Yes. TGS Advisor provides factory floor training, management-level workshops, leadership programs and customized skill development sessions both on site and virtually. Programs are tailored to a client’s operations, maturity level and performance goals.",
  },
  {
    question: "How does TGS Advisor approach process impovement?",
    answer: `We use a data-driven, root-cause-first methodology. Our specialists assess the current workflow end to end—planning, IE, supply chain, HR, compliance and financial structure—then redesign systems to improve efficiency, reduce waste and unlock measurable productivity gains.`,
  },
  {
    question:
      "Can TGS Advisor help with complete organization restructuring or KPI system?",
    answer:
      "Absolutely. Our experts have implemented KPI frameworks, OKR systems, succession planning, HR restructuring, planning architecture and SOP development for leading organizations. We ensure implementation is practical, scalable and aligned with your longterm objectives.",
  },
  {
    question: "How can I get started with TGS Advisor?",
    answer:
      "You can contact us through our website’s inquiry form or email. We begin with a short consultation to understand your challenges, goals and operational context. Based on that, we propose a tailored action plan, timeline and engagement model that fits your requirements.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-[#EED39F] pb-4">
            {/* Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-center justify-between text-left text-base font-bold text-white text-sm md:text-xl"
            >
              {item.question}

              {/* Icon */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-xl"
              >
                {isOpen ? "−" : "+"}
              </motion.span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: "easeInOut" },
                    opacity: { duration: 0.25 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-xs text-[#F4F4F4] md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
