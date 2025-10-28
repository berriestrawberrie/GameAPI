import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/users/:id/statistics
router.get("/:id/statistics", (req, res) => {
  void (async () => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    try {
      const scores = await prisma.score.findMany({
        where: { userId },
        include: { game: true },
      });

      if (scores.length === 0) {
        res.status(400).json({ message: "No statistics found for this user." });
        return;
      }

      const totalGames = scores.length;
      const totalTime = scores.reduce(
        (sum, s) => sum + (s.durationMinutes || 0),
        0
      );

      const gamePlayCounts: Record<string, number> = {};
      for (const s of scores) {
        const title = s.game.title;
        gamePlayCounts[title] = (gamePlayCounts[title] || 0) + 1;
      }

      const topGame = Object.entries(gamePlayCounts).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      res.json({
        userId,
        totalGames,
        totalTime,
        topGame,
      });
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      res.status(500).json({ error: "Failed to fetch user statistics" });
    }
  })();
});

// GET /api/users/:id/game-stats
router.get("/:id/game-stats", (req, res) => {
  void (async () => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    try {
      const scores = await prisma.score.findMany({
        where: { userId },
        include: { game: true },
      });

      if (scores.length === 0) {
        res.json([]);
        return;
      }

      const stats: Record<string, number> = {};
      scores.forEach((s) => {
        const title = s.game.title;
        const minutes = s.durationMinutes || 0;
        stats[title] = (stats[title] || 0) + minutes;
      });

      const result = Object.entries(stats).map(([game, totalMinutes]) => ({
        game,
        totalMinutes,
      }));

      res.json(result);
    } catch (error) {
      console.error("Error fetching game stats:", error);
      res.status(500).json({ error: "Failed to fetch game stats" });
    }
  })();
});

export default router;
