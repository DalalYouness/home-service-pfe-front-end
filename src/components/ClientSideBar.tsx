import React from "react";
import { NavLink } from "react-router-dom";
import { User, LayoutDashboard } from "lucide-react";

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
    <>
      {/* ========================================================
          1️⃣ DESKTOP SIDEBAR (كتظهر غير فـ الـ Desktop: md:flex)
         ======================================================== */}
      <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] sticky top-16 left-0 p-4 hidden md:flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-1.5">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
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

        <div className="text-xxs text-gray-400 px-4">dalyoo v1.0.0</div>
      </aside>

      {/* ========================================================
          2️⃣ MOBILE BOTTOM NAVIGATION (كتظهر غير فـ التلفون: md:hidden)
          درنا ليها fixed لتحت كاع و z-50 باش تبقى ديما فوق الـ content
         ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-around items-center z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] h-16">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
                isActive ? "text-emerald-900 font-semibold" : "text-gray-400"
              }`
            }
          >
            {/* الأيقونة كتكبر شوية فـ التلفون باش تجيها ساهلة فـ الكليك */}
            <div className="p-1">{item.icon}</div>
            <span className="text-[10px] tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};
