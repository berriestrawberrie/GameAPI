/**
 * Database seed script.
 * Inserts sample users, games, and sessions for testing.
 *
 * Run with:
 *   npm run prisma:seed
 *
 * Backend team:
 * - Use this to prefill DB with sample data for demo/testing.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding test data...");

  // Clear existing data to avoid duplicates
  await prisma.score.deleteMany();
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();

  // --- Users ---
  const user1 = await prisma.user.create({
    data: {
      email: "anton@example.com",
      firstName: "Anton",
      lastName: "Andersson",
    },
  });
  const user2 = await prisma.user.create({
    data: { email: "bob@example.com", firstName: "Bob", lastName: "Bergström" },
  });
  const user3 = await prisma.user.create({
    data: {
      email: "Larry@example.com",
      firstName: "Larry",
      lastName: "Carlsson",
    },
  });
  const user4 = await prisma.user.create({
    data: { email: "diana@example.com", firstName: "Diana", lastName: "Dahl" },
  });
  const user5 = await prisma.user.create({
    data: { email: "erik@example.com", firstName: "Erik", lastName: "Ekström" },
  });

  // --- Games ---
  const game1 = await prisma.game.create({
    data: { title: "Game 1" },
  });
  const game2 = await prisma.game.create({
    data: { title: "Game 2" },
  });
  const game3 = await prisma.game.create({
    data: { title: "Game 3" },
  });
  const game4 = await prisma.game.create({
    data: { title: "Game 4" },
  });

  // --- Scores ---
  await prisma.score.createMany({
    data: [
      {
        userId: user1.id,
        gameId: game1.id,
        startedAt: new Date("2025-10-17T09:00:00Z"),
        stoppedAt: new Date("2025-10-17T09:20:00Z"),
        durationMinutes: 20,
      },
      {
        userId: user2.id,
        gameId: game2.id,
        startedAt: new Date("2025-10-17T10:00:00Z"),
        stoppedAt: new Date("2025-10-17T10:15:00Z"),
        durationMinutes: 15,
      },
      {
        userId: user3.id,
        gameId: game3.id,
        startedAt: new Date("2025-10-17T11:00:00Z"),
        stoppedAt: new Date("2025-10-17T11:25:00Z"),
        durationMinutes: 25,
      },
      {
        userId: user4.id,
        gameId: game4.id,
        startedAt: new Date("2025-10-17T12:00:00Z"),
        stoppedAt: new Date("2025-10-17T12:30:00Z"),
        durationMinutes: 30,
      },
      {
        userId: user5.id,
        gameId: game1.id,
        startedAt: new Date("2025-10-17T13:00:00Z"),
        stoppedAt: new Date("2025-10-17T13:20:00Z"),
        durationMinutes: 20,
      },
      {
        userId: user1.id,
        gameId: game2.id,
        startedAt: new Date("2025-10-17T14:00:00Z"),
        stoppedAt: new Date("2025-10-17T14:18:00Z"),
        durationMinutes: 18,
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
