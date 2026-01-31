"use server";

import { revalidatePath } from "next/cache";

const PUBLIC_ROUTES = [
  "/",
  "/contact-us",
  "/gallery",
  "/our-services",
  "/our-team",
  "/our-vision-and-mission",
  "/who-we-are",
  "/our-clients",
];

export async function revalidatePublicPages(...extraPaths: string[]) {
  const uniquePaths = Array.from(new Set([...PUBLIC_ROUTES, ...extraPaths]));

  await Promise.all(uniquePaths.map((path) => revalidatePath(path)));
}
