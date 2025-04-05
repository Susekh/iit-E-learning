import {
  ChartNoAxesColumn,
  SquareChartGantt,
  SquareLibrary,
  User,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);

  const links = [
    {
      to: "dashboard",
      label: "Dashboard",
      icon: <ChartNoAxesColumn size={20} />,
    },
    {
      to: "course",
      label: "Courses",
      icon: <SquareLibrary size={20} />,
    },
    ...(user?.role === "admin"
      ? [
          {
            to: "/admin/add/member",
            label: "Add Members",
            icon: <User size={20} />,
          },
          {
            to: "/admin/manage",
            label: "Manage Members",
            icon: <SquareChartGantt size={20} />,
          },
        ]
      : []),
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[250px] sm:w-[300px] p-6 border-r border-gray-200 dark:border-gray-700 sticky top-0 space-y-6 h-screen bg-white dark:bg-black">
        <nav className="space-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {link.icon}
              <span className="text-md font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
