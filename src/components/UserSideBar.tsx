import React from "react";
import { NavLink } from "react-router-dom";
import { User, LayoutDashboard, Settings, Calendar } from "lucide-react";

const menuItems = [
  {
    name: "Tableau de bord",
    path: "/user/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Mes Réservations",
    path: "/user/my-reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    name: "Profil",
    path: "/user/myprofil",
    icon: <User className="w-5 h-5" />,
  },
  {
    name: "Paramètres du compte",
    path: "/user/account-setting",
    icon: <Settings className="w-5 h-5" />,
  },
];

export const UserSidebar: React.FC = () => {
  return (
    <>
      {/* ========================================================
          1 - DESKTOP SIDEBAR
         ======================================================== */}
      <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] sticky top-16 left-0 p-4 hidden md:flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="text-[10px] text-gray-400 px-4">dalyoo v1.0.0</div>
      </aside>

      {/* ========================================================
          2 - MOBILE BOTTOM NAVIGATION
         ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-2 flex justify-around items-center z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] h-16">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${
                isActive ? "text-emerald-900 font-semibold" : "text-gray-400"
              }`
            }
          >
            <div className="p-0.5">{item.icon}</div>
            <span className="text-[10px] tracking-tight text-center truncate max-w-[70px]">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default UserSidebar;
