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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;