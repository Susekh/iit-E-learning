import { ChartNoAxesColumn, SquareChartGantt, SquareLibrary, User } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  // Access user data from Redux store
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin/add/member" className="flex items-center gap-2">
              <User size={22} />
              <h1>Add Members</h1>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin/manage" className="flex items-center gap-2">
              <SquareChartGantt size={22} />
              <h1>Manage Members</h1>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
