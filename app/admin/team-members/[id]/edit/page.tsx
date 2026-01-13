import { getTeamMember } from "@/app/actions/team-action";
import NotFoundSign from "@/app/components/not-found-sign";
import { TeamMemberForm } from "../../components/team-members-from";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <NotFoundSign />;
  }

  const { data: teamMember } = await getTeamMember(Number(id));

  if (!teamMember) {
    return <NotFoundSign description="Service not found." />;
  }

  return (
    <div className="mx-auto  px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit Team Member {id}
        </h1>
      </div>
      <TeamMemberForm
        teamMember={{
          name: teamMember.name,
          designation: teamMember.designation ?? "",
          company: teamMember.company ?? "",
          education: teamMember.education ?? "",
          specialization: teamMember.specialization ?? "",
          description: teamMember.description ?? "",
          image: teamMember.image ?? "",
        }}
      />
    </div>
  );
}
