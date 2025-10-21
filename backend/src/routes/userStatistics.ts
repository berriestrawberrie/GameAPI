import { Router } from "express";
import { prisma } from "../lib/prisma";
import { error } from "console";
import { number } from "zod";

const router = Router();

//GET /api/users/:id/statistics
router.get("/:id/statistics", async (req, res) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  // Fetch all scores by this user, including game info
  try {
    const scores = await prisma.score.findMany({
      where: { userId },
      include: { game: true },
    });

    if (scores.length === 0) {
      return res
        .status(400)
        .json({ message: "No statistics found for this user." });
    }

    // Calculate total games and total play time
    const totalGames = scores.length;
    const totalTime = scores.reduce(
      (sum, s) => sum + (s.durationMinutes || 0),
      0
    );

    // Find  most-played game
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
});

export default router;
