/**
 * Handles all /api/users endpoints.
 *
 * GET /api/users         → list all users
 * POST /api/users        → create new user
 * PUT /api/users/:id     → update user info
 * DELETE /api/users/:id  → delete a user
 *
 * Backend team: implement user CRUD logic here using Prisma.
 */
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/users
// Fetch all users from DB
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
