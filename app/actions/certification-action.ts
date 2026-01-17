"use server";

import prisma from "@/lib/prisma";
import {
  CertificationCreateInput,
  certificationCreateSchema,
  CertificationUpdateInput,
  certificationUpdateSchema,
} from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const CERTIFICATES_PATH = "/admin/certificates";

export async function getCertifications() {
  try {
    const certificates = await prisma.certification.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: certificates };
  } catch (error) {
    console.error("Failed to fetch certifications:", error);
    return { error: "Failed to fetch certifications." };
  }
}

export async function getCertification(id: number) {
  try {
    const certificate = await prisma.certification.findUnique({
      where: { id },
    });

    return { success: true, data: certificate };
  } catch (error) {
    console.error("Failed to fetch certification:", error);
    return { error: "Failed to fetch certification." };
  }
}

export async function createCertification(data: CertificationCreateInput) {
  const parsed = certificationCreateSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  try {
    await prisma.certification.create({
      data: {
        title: parsed.data.title,
        image: parsed.data.image ?? "",
      },
    });

    revalidatePath(CERTIFICATES_PATH);
    return { success: true };
  } catch (error) {
    console.error("Failed to create certification:", error);
    return { error: "Failed to create certification. Please try again." };
  }
}

export async function updateCertification(
  id: number,
  data: CertificationUpdateInput,
) {
  const parsed = certificationUpdateSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  try {
    await prisma.certification.update({
      where: { id },
      data: {
        title: parsed.data.title,
        image: parsed.data.image,
      },
    });

    revalidatePath(CERTIFICATES_PATH);
    return { success: true };
  } catch (error) {
    console.error("Failed to update certification:", error);
    return { error: "Failed to update certification. Please try again." };
  }
}

export async function deleteCertification(id: number) {
  try {
    await prisma.certification.delete({
      where: { id },
    });

    revalidatePath(CERTIFICATES_PATH);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete certification:", error);
    return { error: "Failed to delete certification. Please try again." };
  }
}
