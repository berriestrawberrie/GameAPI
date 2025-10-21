/**
 * Initializes the Express app.
 * - Applies middleware (CORS, JSON body parser)
 * - Mounts all API routes (users, games, sessions)
 * - Exposes app object (used by server.ts)
 *
 * Backend team:
 * - Add new route imports here when new endpoints are created.
 */
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";
import scoresRouter from "./routes/scores";
import userStatisticsRouter from "./routes/userStatistics";

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use("/api/users", usersRouter);
app.use("/api/games", gamesRouter);
app.use("/api/scores", scoresRouter);
app.use("/api/users", userStatisticsRouter);

app.get("/", (req, res) => {
  res.send("🎮 Game Time Tracker API is running!");
});

export default app;
