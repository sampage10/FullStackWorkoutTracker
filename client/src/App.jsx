import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx";
import Home from './pages/Home.jsx';
import CreateWorkout from './pages/CreateWorkout.jsx';



function Profile() {
  return <h1>Profile Page</h1>;
}

function History() {
  return <h1>Workout History</h1>;
}

function StartWorkout() {
  return <h1>Start Workout (Home)</h1>;
}

function Exercises() {
  return <h1>Exercises Library</h1>;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-workout" element={<CreateWorkout />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/exercises" element={<Exercises />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default App;