// app/api/seed/route.ts
import {
  defaultPassword,
  defaultUserEmail,
  defaultUserName,
} from "@/config/config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Optional: Delete existing data first to ensure a clean seed
    await prisma.user.deleteMany();
    await prisma.about.create({
      data: {
        email: "admin@tgsadvisor.com",
        phone: "1234567890",
        whatsapp: "1234567890",
        address: "123 Main St, Anytown, USA",
        facebook: "https://facebook.com/tgsadvisor",
        linkedin: "https://linkedin.com/tgsadvisor",
        youtube: "https://youtube.com/tgsadvisor",
        instagram: "https://instagram.com/tgsadvisor",
      },
    });

    const hashPassword = await bcrypt.hash(defaultPassword, 10);

    await prisma.user.create({
      data: {
        name: defaultUserName,
        email: defaultUserEmail,
        password: hashPassword,
      },
    });

    console.log("Database seeded successfully");

    return NextResponse.json(
      { message: "Database seeded successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 },
    );
  }
}
