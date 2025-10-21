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

export default router;
