import express from "express";
import WorkoutInstance from "../models/workoutInstance.js";

const router = express.Router();

// GET all workout instances (history)
router.get("/", async (req, res) => {
  try {
    const instances = await WorkoutInstance.find().sort({ date: -1 });
    res.json(instances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single workout instance by ID
router.get("/:id", async (req, res) => {
  try {
    const instance = await WorkoutInstance.findById(req.params.id);
    if (!instance) return res.status(404).json({ message: "Workout not found" });
    res.json(instance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create (log) a workout instance
router.post("/", async (req, res) => {
  const { templateId, date, notes, completedExercises } = req.body;

  const newInstance = new WorkoutInstance({
    templateId,
    date,
    notes,
    completedExercises,
  });

  try {
    const saved = await newInstance.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
