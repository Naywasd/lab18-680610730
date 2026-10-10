import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "./generated/prisma/client.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Creating default users...");

  const hashedAdminPassword = await bcrypt.hash("5678", 10);
  const hashedStudentPassword = await bcrypt.hash("1234", 10);

  await prisma.user.upsert({
    where: { username: "user4@abc.com" },
    update: {},
    create: {
      username: "user4@abc.com",
      password: hashedAdminPassword,
      role: "ADMIN",
      studentId: null,
      tokens: [],
    },
  });

  await prisma.user.upsert({
    where: { username: "user1@abc.com" },
    update: {},
    create: {
      username: "user1@abc.com",
      password: hashedStudentPassword,
      role: "STUDENT",
      studentId: "680610001",
      tokens: [],
    },
  });

  console.log("Users created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });