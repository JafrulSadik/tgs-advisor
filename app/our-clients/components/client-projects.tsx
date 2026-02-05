"use client";

import { ClientTypes } from "@/app/types/clients";
import Card from "./card";

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
