import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 p-4">
        <NavLink
          to="/apply"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "text-gray-600"
          }
        >
          Apply
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "text-gray-600"
          }
        >
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
}