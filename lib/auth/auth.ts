"use server";
import { authCookieName } from "@/config/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(authCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(authCookieName)?.value;
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(authCookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const getAuthToken = cache(async (): Promise<string | undefined> => {
  return getAuthCookie();
});

export const isAuthenticated = cache(async (): Promise<boolean> => {
  const token = await getAuthCookie();
  return !!token;
});

export async function logout(): Promise<void> {
  await removeAuthCookie();
  redirect("/login");
}
