import { useState, useEffect } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { RiLogoutCircleRFill, RiSettings5Fill } from "react-icons/ri";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const SideBar = () => {
  const menuItems = SidebarMenuItem();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleLogoutModal = () => {
    setOpenLogoutModal(!openLogoutModal);
  };

  useEffect(() => {
    const findPageTitle = () => {
      const currentItem = menuItems.find((item) =>
        location.pathname.endsWith(item.path)
      );
      if (currentItem) {
        setPageTitle(currentItem.label);
      } else {
        setPageTitle("");
      }
    };
    findPageTitle();
  }, [location.pathname, menuItems]);

  return (
    <div>
      {/* Mobile Top Nav */}
      <nav
        className={`px-5 py-3 fixed z-50 w-full lg:hidden glass-panel text-primary-text transition-transform duration-300 ${
          openSidebar ? "-translate-y-full" : "translate-x-0"
        }`}
      >
        <div className="flex gap-3 items-center">
          <button
            className="text-xl lg:hidden text-primary-text hover:text-brand transition-colors"
            title="Expand Sidebar"
            onClick={toggleMenu}
          >
            <BsLayoutSidebarInset />
          </button>
          <h3 className="md:text-lg font-semibold">{pageTitle}</h3>
        </div>
      </nav>

      {openSidebar && (
        <div
          className="fixed inset-0 bg-dark-gray/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Main Sidebar */}
      <div
        className={`fixed h-full top-0 left-0 bottom-0 z-40 w-64 py-6 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
 ${
   openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
 } bg-surface/80 backdrop-blur-2xl border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}
      >
        <div className="overflow-y-auto px-5 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pl-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-teal flex items-center justify-center text-white font-bold shadow-lg shadow-brand/20">
                  JT
                </div>
                <p className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-dark-gray to-gray">Job Tracker</p>
              </div>
              <button
                className="text-xl lg:hidden text-tertiary-text hover:text-primary-text"
                title="Minimize Sidebar"
                onClick={toggleMenu}
              >
                <BsLayoutSidebarInset />
              </button>
            </div>

            {/* Top sidebar items */}
            <ul className="space-y-1.5 mt-6">
              {menuItems.map((item) => {
                const isActive = location.pathname.endsWith(item.path);
                return (
                  <li key={item.id} onClick={toggleMenu}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out group ${
                        isActive 
                          ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-md shadow-brand/20 translate-x-1" 
                          : "text-secondary-text hover:bg-white hover:shadow-soft hover:text-primary-text"
                      }`}
                    >
                      <span className={`text-[1.35rem] transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                      <h4 className="font-medium">{item.label}</h4>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="mb-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-light-gray to-transparent mb-4"></div>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="settings"
                  className="flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer text-secondary-text hover:bg-white hover:shadow-soft hover:text-primary-text transition-all duration-300"
                  onClick={toggleMenu}
                >
                  <span className="text-[1.35rem]">
                    <RiSettings5Fill />
                  </span>
                  <div className="font-medium">Settings</div>
                </Link>
              </li>
              <li>
                <div
                  className="flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer text-error/80 hover:bg-red-light hover:text-error transition-all duration-300"
                  onClick={() => {
                    toggleMenu();
                    toggleLogoutModal();
                  }}
                >
                  <span className="text-[1.35rem]">
                    <RiLogoutCircleRFill />
                  </span>
                  <div className="font-medium">Logout</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {openLogoutModal && (
        <LogoutModal setOpenLogoutModal={setOpenLogoutModal} />
      )}
    </div>
  );
};

export default SideBar;
