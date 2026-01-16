"use server";

import prisma from "@/lib/prisma";
import {
  TeamCreateInput,
  teamCreateSchema,
  TeamUpdateInput,
  teamUpdateSchema,
} from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createTeamMember(data: TeamCreateInput) {
  const teamData = teamCreateSchema.safeParse(data);

  if (!teamData.success) {
    return { error: "Invalid input", details: teamData.error.flatten() };
  }

  const {
    name,
    designation,
    company,
    education,
    specialization,
    description,
    image,
  } = teamData.data;

  try {
    await prisma.team.create({
      data: {
        name,
        designation,
        company,
        education,
        specialization,
        description,
        image,
      },
    });

    revalidatePath("/admin/team-members");
    return { success: true };
  } catch (error) {
    console.error("Error creating service:", error);
    return { error: "Failed to create service." };
  }
}
export async function updateTeamMember(id: number, data: TeamUpdateInput) {
  const teamData = teamUpdateSchema.safeParse(data);

  if (!teamData.success) {
    return { error: "Invalid input", details: teamData.error.flatten() };
  }

  const {
    name,
    designation,
    company,
    education,
    specialization,
    description,
    image,
  } = teamData.data;

  try {
    await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        designation,
        education,
        specialization,
        company,
        image,
      },
    });

    revalidatePath("/admin/team-members");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { error: "Failed to update team. Please try again." };
  }
}

export async function deleteTeamMember(id: number) {
  try {
    await prisma.team.delete({
      where: { id },
    });
    revalidatePath("/admin/team-members");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete team:", error);
    return { error: "Failed to delete team. Please try again." };
  }
}

export async function getTeamMembers() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: teams };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { error: "Failed to fetch teams." };
  }
}

export async function getTeamMember(id: number) {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
    });
    return { success: true, data: team };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { error: "Failed to fetch teams." };
  }
}
