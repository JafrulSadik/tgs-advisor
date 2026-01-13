"use client";

import { createTeamMember, updateTeamMember } from "@/app/actions/team-action";
import { teamCreateSchema, type TeamCreateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RichTextEditor } from "../../components/rich-text-editor";

type TeamMemberFormProps = {
  teamMember?: TeamCreateInput;
};

export function TeamMemberForm({ teamMember }: TeamMemberFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TeamCreateInput>({
    resolver: zodResolver(teamCreateSchema),
    defaultValues: {
      name: teamMember?.name ?? "",
      designation: teamMember?.designation ?? "",
      company: teamMember?.company ?? "",
      education: teamMember?.education ?? "",
      specialization: teamMember?.specialization ?? "",
      description: teamMember?.description ?? "",
      image: teamMember?.image ?? "",
    },
  });

  const onSubmit = async (data: TeamCreateInput) => {
    setServerError(null);

    let result;

    if (id) {
      result = await updateTeamMember(Number(id), data);
    } else {
      result = await createTeamMember(data);
    }

    if (result?.error) {
      setServerError(result.error);
      return;
    }

    if (result?.success) {
      router.push("/admin/team-members");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 rounded-xl shadow-sm bg-[#FFFFFF]"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="e.g. John Doe"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="designation"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Designation
        </label>
        <input
          id="designation"
          type="text"
          {...register("designation")}
          placeholder="e.g. Senior Developer"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.designation && (
          <p className="text-xs text-red-500">{errors.designation.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          {...register("company")}
          placeholder="e.g. TechCorp Inc."
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.company && (
          <p className="text-xs text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="education"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Education
        </label>
        <input
          id="education"
          type="text"
          {...register("education")}
          placeholder="e.g. B.Sc in Computer Science"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.education && (
          <p className="text-xs text-red-500">{errors.education.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="specialization"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Specialization
        </label>
        <input
          id="specialization"
          type="text"
          {...register("specialization")}
          placeholder="e.g. Frontend Architecture"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.specialization && (
          <p className="text-xs text-red-500">
            {errors.specialization.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Bio / Description <span className="text-red-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Write a short bio..."
            />
          )}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="image"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Profile Image URL
        </label>
        <input
          id="image"
          type="url"
          {...register("image")}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />
        {errors.image && (
          <p className="text-xs text-red-500">{errors.image.message}</p>
        )}
      </div>

      {serverError && (
        <div className="p-3 rounded-md border border-red-200 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800/80 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {id
            ? isSubmitting
              ? "Updating..."
              : "Update Team Member"
            : isSubmitting
            ? "Creating..."
            : "Add Team Member"}
        </button>
      </div>
    </form>
  );
}
