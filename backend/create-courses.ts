import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding courses and students data...");

  const courses = [
    { courseId: "261210", courseTitle: "Data Structures and Algorithms", credit: 3 },
    { courseId: "261207", courseTitle: "Object-Oriented Programming", credit: 3 },
    { courseId: "261216", courseTitle: "Computer Architecture", credit: 3 },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { courseId: c.courseId },
      update: {},
      create: c,
    });
  }

  await prisma.student.upsert({
    where: { studentId: "680610001" },
    update: {},
    create: {
      studentId: "680610001",
      firstName: "Matt",
      lastName: "Damon",
      program: "CPE",
    },
  });

  console.log("Courses and Students seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });