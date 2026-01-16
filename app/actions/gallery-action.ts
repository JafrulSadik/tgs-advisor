"use server";

import { galleryLimit } from "@/config/config";
import prisma from "@/lib/prisma";
import {
  GalleryImageCreateInput,
  galleryImageCreateSchema,
  GalleryImageOrderInput,
  galleryImageOrderSchema,
} from "@/lib/schemas";

import { revalidatePath } from "next/cache";

export async function getGalleryImages() {
  try {
    const images = await prisma.imageGallery.findMany({
      orderBy: { sequence: "asc" },
    });
    return { success: true, data: images };
  } catch (error) {
    console.error("Failed to fetch gallery images", error);
    return { error: "Failed to fetch gallery images." };
  }
}

export async function createGalleryImage(data: GalleryImageCreateInput) {
  const parsed = galleryImageCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  const currentCount = await prisma.imageGallery.count();
  if (currentCount >= galleryLimit) {
    return { error: "Gallery can only contain 8 images." };
  }

  try {
    await prisma.imageGallery.create({
      data: {
        name: parsed.data.name,
        image: parsed.data.image,
        sequence: currentCount + 1,
      },
    });

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to create gallery image", error);
    return { error: "Failed to create gallery image." };
  }
}

export async function deleteGalleryImage(id: number) {
  try {
    const existing = await prisma.imageGallery.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Gallery image not found." };
    }

    await prisma.$transaction([
      prisma.imageGallery.delete({ where: { id } }),
      prisma.imageGallery.updateMany({
        where: { sequence: { gt: existing.sequence } },
        data: { sequence: { decrement: 1 } },
      }),
    ]);

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete gallery image", error);
    return { error: "Failed to delete gallery image." };
  }
}

export async function updateGalleryOrder(order: GalleryImageOrderInput) {
  const parsed = galleryImageOrderSchema.safeParse(order);
  if (!parsed.success) {
    return { error: "Invalid order", details: parsed.error.flatten() };
  }

  try {
    await prisma.$transaction(
      parsed.data.map(({ id, sequence }) =>
        prisma.imageGallery.update({
          where: { id },
          data: { sequence },
        })
      )
    );

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to update gallery order", error);
    return { error: "Failed to update gallery order." };
  }
}

export async function getGalleryImageCount() {
  try {
    const count = await prisma.imageGallery.count();
    return count;
  } catch (error) {
    console.error("Failed to fetch gallery images", error);
    return [];
  }
}
