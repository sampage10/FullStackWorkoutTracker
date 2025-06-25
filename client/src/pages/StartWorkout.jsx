import React, { useEffect, useState } from "react";

export default function StartWorkout() {
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
    <div>
      <h2>Available Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((w) => (
            <li key={w._id} style={{ marginBottom: "12px" }}>
              <strong>{w.name}</strong> ({w.type})
              <button
                style={{ marginLeft: "12px" }}
                onClick={() => alert(`Starting workout: ${w.name}`)}
              >
                Start
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}