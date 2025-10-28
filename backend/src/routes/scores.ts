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
router.get("/", (req, res) => {
  void (async () => {
    try {
      const scores = await prisma.score.findMany();
      res.json(scores);
    } catch (error) {
      console.error("Error fetching scores:", error);
      res.status(500).json({ error: "Failed to fetch scores" });
    }
  })();
});

// GET /api/games/table/:gameId
router.get("/table/:gameId", (req, res) => {
  void (async () => {
    try {
      const gameId = req.params.gameId;
      const scores = await prisma.score.findMany({
        where: {
          gameId: parseInt(gameId),
        },
        include: {
          user: true,
        },
      });
      res.json(scores);
    } catch (error: unknown) {
      console.error("Error fetching user joined game scores:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch user joined game scores" });
    }
  })();
});

// GET /api/games/:gameId
router.get("/:gameId", (req, res) => {
  void (async () => {
    try {
      console.log(req.params.gameId);
      const gameScores = await prisma.score.findMany({
        where: {
          gameId: parseInt(req.params.gameId),
        },
      });
      res.json(gameScores);
    } catch (error) {
      console.error("Error fetching scores for game:", error);
      res.status(500).json({ error: "Failed to fetch scores for game" });
    }
  })();
});

// POST /api/games
router.post("/", (req, res) => {
  void (async () => {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      res.status(400).send({ message: "Request body is empty" });
      return;
    }

    try {
      const newScore = await prisma.score.create({
        data: {
          userId: body.userId,
          gameId: body.gameId,
          startedAt: new Date(),
          stoppedAt: new Date(),
          durationMinutes: body.durationMinutes,
        },
      });
      res.status(200).json(newScore);
    } catch (error) {
      console.error("Error adding score:", error);
      res.status(500).json({ error: "Failed to save score" });
    }
  })();
});

export default router;
