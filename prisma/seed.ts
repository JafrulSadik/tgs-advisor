import {
  defaultPassword,
  defaultUserEmail,
  defaultUserName,
} from "@/config/config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  await prisma.about.create({
    data: {
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      facebook: "",
      linkedin: "",
      youtube: "",
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
}

main()
  .then(() => console.log("🌱 Seed completed"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
