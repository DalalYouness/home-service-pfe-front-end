import React from "react";
import { NavLink } from "react-router-dom";
import { User, LayoutDashboard, Settings } from "lucide-react";

export const ClientSidebar: React.FC = () => {
  const menuItems = [
    {
      name: "Tableau de bord",
      path: "/client/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Mon Compte",
      path: "/client/compte",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] sticky top-16 left-0 p-4 hidden md:flex flex-col justify-between shrink-0">
      <div className="flex flex-col gap-1.5">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-900" // active style
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900" // default style
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* sidebar footer */}
      <div className="text-xxs text-gray-400 px-4">dalyoo v1.0.0</div>
    </aside>
  );
};
