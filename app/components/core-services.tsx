import ServiceCard from "./service-card";

const coreServices = [
  {
    id: "01",
    service: "Production Efficiency Development",
    color: "#00BDF2",
    tag: "production-efficiency-development",
  },
  {
    id: "02",
    service: "Cost Reduction & Profit Maximization",
    color: "#F68D3A",
    tag: "cost-reduction-profit-maximization",
  },
  {
    id: "03",
    service: "Skill & Motivation Training",
    color: "#194C60",
    tag: "skill-motivation-training",
  },
  {
    id: "04",
    service: "Fabric & Material Optimization",
    color: "#E7404C",
    tag: "fabric-material-control",
  },
  {
    id: "05",
    service: "Factory System Setup & Restructuring",
    color: "#92C441",
    tag: "factory-system-setup-restructuring",
  },
  {
    id: "06",
    service: "Compliance & HR KPI Development",
    color: "#7C53A2",
    tag: "hr-compliance-development",
  },
];

export default function CoreServices() {
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
        {coreServices.map((service, i) => (
          <ServiceCard
            key={service.id}
            number={service.id}
            serviceText={service.service}
            align={i % 2 === 0 ? "right" : "left"}
            color={service.color}
            tag={service.tag}
          />
        ))}
      </div>
    </div>
  );
}
