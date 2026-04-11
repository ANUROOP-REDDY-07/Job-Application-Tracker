import SideBar from "./Components/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface-flat relative antialiased z-0">
      <div className="absolute inset-0 z-[-1] bg-mesh opacity-[0.03]"></div>
      <SideBar />
      <div className="px-6 pb-6 flex-grow lg:ml-64 min-h-screen pt-20 lg:pt-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
