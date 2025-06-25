import express from "express";
import WorkoutTemplate from "../models/workout.js";

const router = express.Router();

// GET all workout templates (library + user-created)
router.get("/", async (req, res) => {
  try {
    const templates = await WorkoutTemplate.find().sort({ name: 1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single template by ID
router.get("/:id", async (req, res) => {
  try {
    const template = await WorkoutTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new workout template
router.post("/", async (req, res) => {
  const { name, type, createdBy, exercises } = req.body;

  const newTemplate = new WorkoutTemplate({
    name,
    type,
    createdBy,
    exercises,
  });

  try {
    const saved = await newTemplate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
