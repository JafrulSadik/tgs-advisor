import OurStrengths from "@/public/images/who-we-are/our-strength.png";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-center">
        <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-2xl md:rounded-3xl my-10 flex justify-center">
          <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
            About TGS Advisor
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-blue text-lg lg:text-2xl">
          Transforming RMG Factories into Profitable, Standard & Sustainable
          Operations.
        </h2>
        <p className="text-sm lg:text-lg">
          We the TGS Advisors is Bangladesh’s leading garments consultancy firm,
          helping factories achieve measurable improvement in efficiency, cost
          reduction, and sustainable management systems. Our team brings more
          than a decade of hands on experience across production, planning, HR
          compliance, and factory operations. We don’t just consult we implement
          practical systems that drive real results. Our Strengths:
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-2xl md:rounded-3xl my-10 flex justify-center">
          <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
            Our Strengths
          </h2>
        </div>
      </div>

      <div className="w-full mb-10 flex justify-center">
        <Image
          src={OurStrengths}
          alt="our-strengths"
          className="md:max-w-[700px]"
        />
      </div>
    </div>
  );
}
