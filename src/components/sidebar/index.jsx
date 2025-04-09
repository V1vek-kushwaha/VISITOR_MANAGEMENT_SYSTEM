import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import vmslogo from "../../assets/images/vms-logo.png";
import { Icon } from "@iconify/react";

const navItemsAdmin = [
  { name: "Dashboard", icon: "mdi:view-dashboard", path: "/" },
  { name: "Visitors", icon: "mdi:account-group", path: "/visitor" },
  { name: "Users", icon: "mdi:account-box-multiple", path: "/user" },
  { name: "Passes", icon: "mdi:credit-card-outline", path: "/pass" },
  { name: "Reports", icon: "mdi:file-document-outline", path: "/report" },
  { name: "FAQ", icon: "mdi:comment-question-outline", path: "/faq" },
  { name: "Configure", icon: "mdi:cog-outline", path: "/configure" },
];

const navItemsReceptionist = [
  { name: "Dashboard", icon: "mdi:view-dashboard", path: "/" },
  { name: "Visitors", icon: "mdi:account-group", path: "/visitor" },
  { name: "Passes", icon: "mdi:credit-card-outline", path: "/pass" },
  { name: "Reports", icon: "mdi:file-document-outline", path: "/report" },
  { name: "FAQ", icon: "mdi:comment-question-outline", path: "/faq" },
];

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState("");
  const { setUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("user_type");
    setRole(storedRole);
  }, [setUser]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (role === "Guard") return null;

  const navItems = role === "Admin" ? navItemsAdmin : navItemsReceptionist;

  return (
    <aside
      className={`bg-white h-screen border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } shadow-sm`}
    >
      <div className="flex flex-col h-full  py-4 relative">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <img src={vmslogo} alt="VMS Logo" className="h-10 ml-2" />
          )}
          <Icon
            icon="mdi:menu"
            className="text-gray-600 cursor-pointer"
            height="24"
            onClick={toggleSidebar}
          />
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm relative transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                  }
                  ${isCollapsed ? "justify-center px-2" : ""}
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-tr rounded-br" />
                )}
                <Icon icon={item.icon} className="text-[20px]" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          {!isCollapsed && (
            <p className="text-[11px] text-gray-400 font-medium tracking-wide">
              © 2025 Visitor Management
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
