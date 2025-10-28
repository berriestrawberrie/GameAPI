/**
 * Handles all /api/games endpoints.
 *
 * GET /api/games         → list all games
 * POST /api/games        → create a new game
 * PUT /api/games/:id     → update a game
 * DELETE /api/games/:id  → delete a game
 *
 * Backend team: manage games table interactions here.
 */
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/games
// Fetch all games from DB
router.get("/", (req, res) => {
  void (async () => {
    try {
      const games = await prisma.game.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
        },
      });

      res.json(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  })();
});

export default router;
