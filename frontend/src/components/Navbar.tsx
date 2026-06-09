import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E8E8E6] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 lg:px-14">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111110]">
            <span className="text-[11px] font-bold text-white tracking-tight">V</span>
          </div>
          <div className="leading-none">
            <span className="block text-sm font-semibold text-[#111110] tracking-tight">Vitto</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-[#A8A8A3] mt-0.5">
              Loan Portal
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          {[
            { to: "/apply", label: "Apply", icon: FileText },
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#111110] text-white"
                    : "text-[#636360] hover:bg-[#F4F4F2] hover:text-[#111110]"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="hidden sm:block">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
