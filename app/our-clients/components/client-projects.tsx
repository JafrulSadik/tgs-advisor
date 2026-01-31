"use client";

import { ClientTypes } from "@/app/types/clients";
import Card from "./card";

// const DATA: Section[] = [
//   {
//     title: "Organization / Company",
//     items: [
//       "Pacific Knit Division",
//       "Pakiza Knit",
//       "Composite Ltd.",
//       "Knit Plus Ltd. Unit-1",
//       "Knit Plus Ltd. Unit-2",
//       "HR Textile Ltd. (Pride Group)",
//       "Unigears Ltd.",
//       "Capital Fashions Ltd.",
//       "Techno Fiber Ltd.",
//       "JOC (BD) Garments Co. Ltd.",
//       "Keifung Leatherware",
//       "Manufactory Ltd.",
//       "Ubest Bangla",
//       "Fashions Co. Ltd.",
//       "Fair Apparels Ltd. - Textile Unit",
//       "Fair Apparels Ltd. - Garments Unit",
//     ],
//   },
//   {
//     title: "Knitting Production Improvement System",
//     items: [
//       "Knit Plus Ltd.",
//       "Fair Apparels Ltd.",
//       "Pakiza Knit Composite Ltd.",
//     ],
//   },
//   {
//     title: "HR & Admin Management Consultancy System",
//     items: [
//       "JOC (BD) Garments Ltd.",
//       "Keifung Leatherware",
//       "Ubest Bangla Fashions",
//     ],
//   },
//   {
//     title: "Garments Production Improvement System",
//     items: [
//       "Pacific Knit Division",
//       "Pakiza Knit Composite Ltd.",
//       "Savertex Group",
//     ],
//   },
//   {
//     title: "Swiss Contact",
//     items: [
//       "Fatullah Apparels Ltd.",
//       "Fair Apparels Ltd.",
//       "Bangla Poshak Ltd.",
//       "Unigears Ltd.",
//       "Knit Plus Ltd.",
//       "Pacific Knit Division",
//     ],
//   },
// ];

type ClientProjectsProps = {
  clients: ClientTypes[];
};

export default function ClientProjects({ clients }: ClientProjectsProps) {
  return (
    <div className="bg-blue-50 min-h-screen p-4 lg:p-6">
      <div className="mx-auto max-w-6xl columns-1 sm:columns-2 lg:columns-2 gap-6 my-5 lg:my-10 space-y-6">
        {clients.map((section) => (
          <Card
            key={section.title}
            title={section.title}
            description={section.description}
          />
        ))}
      </div>
    </div>
  );
}
