import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkout() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Strength");
  const [exercises, setExercises] = useState([""]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Add a blank exercise input
  const addExercise = () => {
    setExercises([...exercises, ""]);
  };

  // Remove exercise input by index
  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // Update exercise value by index
  const updateExercise = (index, value) => {
    const newExercises = [...exercises];
    newExercises[index] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Simple validation: workout name required, at least one non-empty exercise
    if (!name.trim()) {
      setError("Workout name is required.");
      setSubmitting(false);
      return;
    }

    if (exercises.filter(e => e.trim() !== "").length === 0) {
      setError("Add at least one exercise.");
      setSubmitting(false);
      return;
    }

    // Prepare payload
    const payload = {
      name: name.trim(),
      type,
      createdBy: "user", // mark it as user-created
      exercises: exercises.filter(e => e.trim() !== "").map(e => ({ name: e.trim() })),
    };

    try {
      const res = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create workout");
      }

      navigate("/"); // Redirect to home after success
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Create New Workout</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="workoutName" className="form-label">Workout Name</label>
          <input
            id="workoutName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workoutType" className="form-label">Workout Type</label>
          <select
            id="workoutType"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={submitting}
          >
            <option>Strength</option>
            <option>Cardio</option>
            <option>Flexibility</option>
            <option>Mixed</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Exercises</label>
          {exercises.map((ex, i) => (
            <div key={i} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder={`Exercise #${i + 1}`}
                value={ex}
                onChange={(e) => updateExercise(i, e.target.value)}
                disabled={submitting}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeExercise(i)}
                disabled={submitting}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addExercise}
            disabled={submitting}
          >
            + Add Exercise
          </button>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Create Workout"}
        </button>
      </form>
    </div>
  );
}