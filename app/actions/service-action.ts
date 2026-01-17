"use server";

import { prisma } from "@/lib/prisma";
import { ServiceCreateInput, serviceCreateSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createService(data: ServiceCreateInput) {
  const result = serviceCreateSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const { title, description, color } = result.data;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService) {
      return { error: "A service with this title already exists." };
    }

    await prisma.service.create({
      data: {
        title,
        slug,
        description,
        color,
      },
    });

    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { error: "Failed to create service. Please try again." };
  }
}

export async function updateService(id: number, data: ServiceCreateInput) {
  const result = serviceCreateSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const { title, description, color } = result.data;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await prisma.service.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        color,
      },
    });

    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { error: "Failed to update service. Please try again." };
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: services };
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return { error: "Failed to fetch services." };
  }
}

export async function getService(id: number) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    return service;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { error: "Failed to delete service. Please try again." };
  }
}
