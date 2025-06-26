import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [premadeWorkouts, setPremadeWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workouts");
        return res.json();
      })
      .then((data) => {
        const user = data.filter((w) => w.createdBy === "user");
        const premade = data.filter((w) => w.createdBy === "library");
        setUserWorkouts(user);
        setPremadeWorkouts(premade);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container py-5 text-center">Loading workouts...</div>;
  if (error) return <div className="container py-5 text-danger text-center">Error: {error}</div>;

  const WorkoutGrid = ({ title, workouts }) => (
    <section className="mb-5">
      <h2 className="h3 mb-4 border-bottom pb-2">{title}</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <div className="row g-4">
          {workouts.map((w) => (
            <div key={w._id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm hover-shadow cursor-pointer"
                onClick={() => alert(`Start workout: ${w.name}`)}
                style={{ transition: "box-shadow 0.3s ease" }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{w.name}</h5>
                  <p className="card-subtitle mb-3 text-muted fst-italic">{w.type}</p>
                  <p className="mt-auto">
                    <span className="badge bg-secondary">
                      {w.exercises.length} Exercises
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5">Start Workout</h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/create-workout")}
        >
          + New Workout
        </button>
      </div>

      {/* User Workouts */}
      <WorkoutGrid title="My Workouts" workouts={userWorkouts} />

      {/* Premade Workouts */}
      <WorkoutGrid title="Example Workouts" workouts={premadeWorkouts} />
    </div>
  );
}
