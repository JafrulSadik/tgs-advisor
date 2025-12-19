import OurCommitmentImage from "@/public/images/our-vision-and-mission/our-commitment.png";
import OurVisionImage from "@/public/images/our-vision-and-mission/our-vision-cover.jpg";
import { Building2, Leaf, Target, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

const missionItems = [
  {
    number: 1,
    title: "Drive Operational Excellence",
    description:
      "Enable organizations to optimize processes, strengthen planning systems, and achieve consistent, measurable performance improvements.",
    icon: Target,
  },
  {
    number: 2,
    title: "Develop People & Leadership",
    description:
      "Build capability at every level frontline to top management through structured training, leadership programs, and modern HR development frameworks.",
    icon: Users,
  },
  {
    number: 3,
    title: "Strengthen Organizational Systems",
    description:
      "Design and implement robust structures, KPIs, SOPs, and governance mechanisms that align people, processes, and strategy for sustained impact.",
    icon: Building2,
  },
  {
    number: 4,
    title: "Accelerate Strategic Growth",
    description:
      "Support businesses with strategic advisory, innovation insights, and international best practices to help them scale responsibly and competitively.",
    icon: TrendingUp,
  },
  {
    number: 5,
    title: "Promote Ethical & Sustainable Practices",
    description:
      "Encourage organizations to adopt responsible production, transparent systems, and long term workforce development aligned with global expectations.",
    icon: Leaf,
  },
];

export default function OurVision() {
  return (
    <section className="py-10 lg:py-28 gradient-subtle">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 items-center mb-10 lg:mb-24 ">
          <div
            className="order-2 lg:order-1 animate-fade-up lg:col-span-3 flex flex-col justify-centers"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-block text-blue font-semibold text-center md:text-left text-xl  uppercase mb-4">
              Our Vision
            </span>

            <div className="space-y-4 text-muted-foreground  text-sm md:text-base">
              <p>
                To become the most trusted advisory partner for RMG, textile,
                and industrial businesses across Asia — empowering organizations
                to operate with global standards, data-driven systems, and
                sustainable performance excellence.
              </p>
              <p>
                We aim to redefine how factories, corporates, and teams approach
                productivity, leadership, and operational transformation —
                driving long-term competitiveness and responsible growth.
              </p>
            </div>
          </div>

          <div
            className="order-1 lg:order-2 animate-scale-in lg:col-span-1"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative  flex items-center justify-center">
              <Image
                src={OurVisionImage}
                alt="Professional team collaborating in a modern office environment"
                className="relative rounded-xl shadow-elevated w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-up">
          <div className="text-center mb-5 lg:mb-10">
            <span className="inline-block text-blue font-semibold text-xl uppercase mb-4">
              Our Mission
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionItems.map((item, index) => (
              <div
                key={item.number}
                className="group bg-gray-50 rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-linear-to-br from-blue-400 to-blue shrink-0 w-12 h-12 rounded-lg gradient-accent flex items-center justify-center text-blue-foreground shadow-md group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue/10 border border-blue/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {item.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 items-center justify-center gap-6 mt-10 lg:mt-20">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Image
              src={OurCommitmentImage}
              alt="Our Commitment"
              className="rounded-xl"
            />
          </div>
          <div className="lg:col-span-3 order-1 lg:order-2">
            <h3 className="text-center lg:text-left text-blue font-semibold text-xl uppercase mb-4">
              Our Commitment
            </h3>
            <p className="text-justify  text-sm md:text-base">
              Our Commitment TGS Advisor is committed to delivering clear
              solutions, practical implementation, and real improvements not
              just recommendations. We combine field experience, global
              exposure, and expert insight to help organizations unlock their
              full potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
