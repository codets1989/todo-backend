import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid task ID" });

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  const { title, color } = req.body;
  if (!title || !color) return res.status(400).json({ error: "Title and color required" });

  try {
    const task = await prisma.task.create({ data: { title, color } });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid task ID" });

  const { title, color, completed } = req.body;
  if (title === undefined && color === undefined && completed === undefined) {
    return res.status(400).json({ error: "At least one field (title, color, completed) required" });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, color, completed },
    });
    res.json(task);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      // Prisma error: Record to update not found
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid task ID" });

  try {
    await prisma.task.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
