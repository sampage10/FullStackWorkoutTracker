import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workouts");
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Workouts</h1>
      <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/create-workout")}
        >
          + New Workout
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {workouts.length === 0 ? (
          <p>No workouts found.</p>
        ) : (
          workouts.map((w) => (
            <div
              key={w._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
              onClick={() => alert(`Start workout: ${w.name}`)}
            >
              <h2 className="text-xl font-semibold">{w.name}</h2>
              <p className="text-gray-600 mt-1">{w.type}</p>
              <p className="mt-2 text-sm text-gray-700">
                {w.exercises.length} exercises
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
