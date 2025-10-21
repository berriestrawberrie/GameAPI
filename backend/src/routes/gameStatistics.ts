import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/statistics/top-players
router.get("/top-players", async (req, res) => {
  try {
    // Aggregate total playtime per user
    const results = await prisma.score.groupBy({
      by: ["userId"],
      _sum: { durationMinutes: true },
      orderBy: { _sum: { durationMinutes: "desc" } },
      take: 5, // top 5
    });

    // Fetch user details for each top player
    const players = await Promise.all(
      results.map(async (r) => {
        const user = await prisma.user.findUnique({
          where: { id: r.userId },
          select: { firstName: true, lastName: true },
        });
        return {
          name: `${user?.firstName ?? "Unknown"} ${user?.lastName ?? ""}`,
          totalMinutes: r._sum.durationMinutes ?? 0,
        };
      })
    );

    res.json(players);
  } catch (error) {
    console.error("Error fetching top players:", error);
    res.status(500).json({ error: "Failed to fetch top players statistics" });
  }
});

// GET /api/statistics/top-games
router.get("/top-games", async (req, res) => {
  try {
    // Aggregate total playtime per game
    const results = await prisma.score.groupBy({
      by: ["gameId"],
      _sum: { durationMinutes: true },
      orderBy: { _sum: { durationMinutes: "desc" } },
      take: 3, // Top 3 most played games
    });

    // Fetch each game's name
    const games = await Promise.all(
      results.map(async (r) => {
        const game = await prisma.game.findUnique({
          where: { id: r.gameId },
          select: { title: true },
        });
        return {
          title: game?.title ?? "Unknown Game",
          totalMinutes: r._sum.durationMinutes ?? 0,
        };
      })
    );

    res.json(games);
  } catch (error) {
    console.error("Error fetching top games:", error);
    res.status(500).json({ error: "Failed to fetch top games" });
  }
});

// GET /api/statistics/avg-playtime
router.get("/avg-playtime", async (req, res) => {
  try {
    const results = await prisma.score.groupBy({
      by: ["gameId"],
      _avg: { durationMinutes: true },
      orderBy: { _avg: { durationMinutes: "desc" } },
    });

    const games = await Promise.all(
      results.map(async (r) => {
        const game = await prisma.game.findUnique({
          where: { id: r.gameId },
          select: { title: true },
        });
        return {
          title: game?.title ?? "Unknown Game",
          avgMinutes: Math.round(r._avg.durationMinutes ?? 0),
        };
      })
    );

    res.json(games);
  } catch (error) {
    console.error("Error fetching average playtime:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch average playtime per game" });
  }
});

// GET /api/statistics/playtime-last-7-days
router.get("/playtime-last-7-days", async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const results = await prisma.score.groupBy({
      by: ["createdAt"], // Replace "createdAt" with the correct field name from your schema
      _sum: { durationMinutes: true },
      where: {
        createdAt: { gte: sevenDaysAgo, lte: today },
      },
      orderBy: { createdAt: "asc" },
    });

    const formatted = results.map((r) => ({
      date: new Date(r.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      totalMinutes: r._sum.durationMinutes ?? 0,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching playtime history:", error);
    res.status(500).json({ error: "Failed to fetch playtime history" });
  }
});

export default router;
