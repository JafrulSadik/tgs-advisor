"use client";

import { TeamMemberForm } from "../components/team-members-from";

export default function CreateTeamMember() {
  return (
    <div className="mx-auto  px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add Team Member
        </h1>
      </div>
      <TeamMemberForm />
    </div>
  );
}
