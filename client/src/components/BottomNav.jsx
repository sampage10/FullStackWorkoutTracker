import React from "react";
import { NavLink } from "react-router-dom";
import { MdPerson, MdCalendarToday, MdNote, MdFitnessCenter } from "react-icons/md";


const navItems = [
  { label: "Profile", path: "/profile", icon: <MdPerson size={24} /> },
  { label: "History", path: "/history", icon: <MdCalendarToday size={24} /> },
  { label: "Start", path: "/", icon: <MdNote size={24} /> },
  { label: "Exercises", path: "/exercises", icon: <MdFitnessCenter size={24} /> },
];

const BottomNav = () => {
  return (
    <nav className="navbar fixed-bottom bg-light border-top">
      <div className="container-fluid d-flex justify-content-around">
        <NavLink to="/profile" className="text-center text-muted nav-link">
          <MdPerson size={24} />
          <div style={{ fontSize: '0.75rem' }}>Profile</div>
        </NavLink>
        <NavLink to="/history" className="text-center text-muted nav-link">
          <MdCalendarToday size={24} />
          <div style={{ fontSize: '0.75rem' }}>History</div>
        </NavLink>
        <NavLink to="/" className="text-center text-muted nav-link">
          <MdNote size={24} />
          <div style={{ fontSize: '0.75rem' }}>Start</div>
        </NavLink>
        <NavLink to="/exercises" className="text-center text-muted nav-link">
          <MdFitnessCenter size={24} />
          <div style={{ fontSize: '0.75rem' }}>Exercises</div>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;