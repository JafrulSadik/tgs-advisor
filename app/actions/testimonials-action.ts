"use server";

import prisma from "@/lib/prisma";
import {
  testimonialCreateSchema,
  testimonialUpdateSchema,
  type TestimonialCreateInput,
  type TestimonialUpdateInput,
} from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createTestimonial(data: TestimonialCreateInput) {
  const parsed = testimonialCreateSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  try {
    await prisma.testimonial.create({
      data: parsed.data,
    });

    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { error: "Failed to create testimonial." };
  }
}

export async function updateTestimonial(
  id: number,
  data: TestimonialUpdateInput
) {
  const parsed = testimonialUpdateSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { error: "Failed to update testimonial. Please try again." };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { error: "Failed to delete testimonial. Please try again." };
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: testimonials };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { error: "Failed to fetch testimonials." };
  }
}

export async function getTestimonial(id: number) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });
    return { success: true, data: testimonial };
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return { error: "Failed to fetch testimonial." };
  }
}
