export type ServiceData = {
  title: string;
  description: string;
  pointsTitle: string;
  points: string[];
  outcome: string;
  button: string;
  tag: string;
};

export const serviceData: ServiceData[] = [
  {
    title: "Production & Efficiency Development",
    description:
      "We enhance factory productivity through structured, data driven systems and operational discipline.",
    pointsTitle: "Key Focus Area",
    points: [
      "Target-based production control",
      "Real-time performance monitoring",
      "Operator skill matrix setup",
      "Motion study & cycle-time improvement",
      "Waste identification & elimination",
      "Energy, overtime & idle-time saving strategy",
    ],
    outcome:
      "Higher output, reduced loss and consistent performance improvement.",
    button: "Request Advisory Session",
    tag: "production-efficiency-development",
  },
  {
    title: "Cost Reduction & Profit Improvement",
    description:
      "We help organizations lower operational costs and improve profitability through systemic analysis.",
    pointsTitle: "Key Focus Area",
    points: [
      "Department-wise cost audit",
      "Waste & rework reduction",
      "Energy-saving strategies",
      "OT & idle-time control",
      "Fabric consumption efficiency",
    ],
    outcome: "Lower cost per unit and stronger profit margins.",
    button: "Request Advisory Session",
    tag: "cost-reduction-profit-maximization",
  },
  {
    title: "Skill & Motivation Training",
    description:
      "We improve workforce capability through practical, factory-focused training programs.",
    pointsTitle: "Training Programs Include",
    points: [
      "Supervisor leadership programs",
      "Floor management skill sessions",
      "Daily motivation & engagement checklist",
      "Operator technical skill upgrading",
    ],
    outcome:
      "Skilled, motivated teams delivering higher consistency and accountability.",
    button: "Request Advisory Session",
    tag: "skill-motivation-training",
  },
  {
    title: "Fabric & Material Control",
    description:
      "We establish strong material management systems to reduce loss and ensure planning accuracy.",
    pointsTitle: "Key Focus Areas",
    points: [
      "Fabric saving systems",
      "Lay-plan & marker efficiency",
      "Consumption variance tracking",
      "Real-time fabric and trims tracking",
    ],
    outcome:
      "Reduced fabric loss, efficient utilization and improved cost control.",
    button: "Request Advisory Session",
    tag: "fabric-material-control",
  },
  {
    title: "Factory System Setup & Restructuring",
    description:
      "We design and restructure factory systems to ensure clarity, discipline and smooth operational flow.",
    pointsTitle: "Core Activities",
    points: [
      "Department restructuring",
      "Workflow and communication mapping",
      "Role, responsibility and hierarchy alignment",
      "Production floor system setup",
      "Cross-functional coordination framework",
    ],
    outcome:
      "A streamlined factory structure with stronger accountability and reduced operational friction.",
    button: "Request Advisory Session",
    tag: "factory-system-setup-restructuring",
  },
  {
    title: "Compliance & HR KPI Development",
    description:
      "We build modern HR systems and compliance structures aligned with labor law and buyer requirements.",
    pointsTitle: "Key Focus Areas",
    points: [
      "Compliance readiness check",
      "Labor law implementation",
      "HR KPI & performance evaluation",
      "Diagnostic study (5–7 days)",
      "SOP & reporting system setup",
    ],
    outcome:
      "Skilled, motivated teams delivering higher consistency and accountability.",
    button: "Request Advisory Session",
    tag: "hr-compliance-development",
  },
];
