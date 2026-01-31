"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePublicPages } from "@/lib/revalidate";
import { ClientCreateInput, clientCreateSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createClient(data: ClientCreateInput) {
  const result = clientCreateSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const { title, description } = result.data;

  try {
    await prisma.client.create({
      data: {
        title,
        description,
      },
    });

    revalidatePath("/admin/clients");
    await revalidatePublicPages();
    return { success: true };
  } catch (error) {
    console.error("Failed to create client:", error);
    return { error: "Failed to create client. Please try again." };
  }
}

export async function updateClient(id: number, data: ClientCreateInput) {
  const result = clientCreateSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const { title, description } = result.data;

  try {
    await prisma.client.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    revalidatePath("/admin/clients");
    await revalidatePublicPages();
    return { success: true };
  } catch (error) {
    console.error("Failed to update client:", error);
    return { error: "Failed to update client. Please try again." };
  }
}

export async function getClients() {
  try {
    const clients = await prisma.client.findMany();

    return { success: true, data: clients };
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return { error: "Failed to fetch clients." };
  }
}

export async function getClient(id: number) {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
    });
    return client;
  } catch (error) {
    console.error("Failed to fetch client:", error);
    return null;
  }
}

export async function deleteClient(id: number) {
  try {
    await prisma.client.delete({
      where: { id },
    });
    revalidatePath("/admin/clients");
    await revalidatePublicPages();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete client:", error);
    return { error: "Failed to delete client. Please try again." };
  }
}
