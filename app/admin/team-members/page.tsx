import { getTeamMembers } from "@/app/actions/team-action";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeamMembersAction from "./components/team-members-action";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const formatDate = (date: string | Date) =>
  dateFormatter.format(typeof date === "string" ? new Date(date) : date);

export default async function TeamPage() {
  const { data: teamMembers } = await getTeamMembers();

  if (!teamMembers) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your team members list
          </p>
        </div>
        <Link
          href="/admin/team-members/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Team Member
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Profile
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="h-[150px] text-center text-gray-500"
                  >
                    No services found. Click &quot;Create Service&quot; to add
                    one.
                  </td>
                </tr>
              ) : (
                teamMembers.map((teamMember) => (
                  <tr key={teamMember.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {teamMember.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {teamMember.name}
                    </td>
                    <td className="px-6 py-4">
                      {teamMember.image ? (
                        <Image
                          src={teamMember.image || "/placeholder.svg"}
                          alt={teamMember.name}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-md object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 rounded-md" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase">
                          {teamMember.designation}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(teamMember.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <TeamMembersAction
                        id={Number(teamMember.id)}
                        image={teamMember.image}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
