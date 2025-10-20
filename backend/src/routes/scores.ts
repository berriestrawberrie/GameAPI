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
router.get("/", async (req, res) => {
  try {
    const scores = await prisma.score.findMany();

    res.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

router.get("/:gameId", async (req, res) => {
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
});

router.post("/", async (req, res) => {
  const body = req.body;
  //BODY IS EMPTY
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send({
      message: "Request body is empty",
    });
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
});

export default router;
