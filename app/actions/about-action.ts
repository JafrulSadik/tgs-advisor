"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePublicPages } from "@/lib/revalidate";
import { AboutUpdateInput, aboutUpdateSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getAbout() {
  try {
    const about = await prisma.about.findFirst();

    return { success: true, data: about };
  } catch (error) {
    return { error: "Failed to fetch about data." };
  }
}

export async function updateAbout(data: AboutUpdateInput) {
  const result = aboutUpdateSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  try {
    const existing = await prisma.about.findFirst({
      orderBy: { id: "asc" },
      select: { id: true },
    });

    if (existing) {
      await prisma.about.update({
        where: { id: existing.id },
        data: result.data,
      });
    } else {
      await prisma.about.create({
        data: result.data,
      });
    }

    revalidatePath("/admin/about");
    await revalidatePublicPages();
    return { success: true };
  } catch (error) {
    console.error("Failed to upsert about data:", error);
    return { error: "Failed to save about data." };
  }
}
