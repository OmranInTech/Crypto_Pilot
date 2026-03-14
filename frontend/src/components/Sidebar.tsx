import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaRobot,
  FaToolbox,
  FaWallet,
  FaCogs,
} from "react-icons/fa";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Trending Coins", icon: <FaChartLine />, path: "/trending-coins" },
    { name: "Bot Helper", icon: <FaRobot />, path: "/bot-helper" },
    { name: "Bot Auto Trader", icon: <FaToolbox />, path: "/auto-trader" },
    { name: "Wallet", icon: <FaWallet />, path: "/wallet" },
  ];

  const sidebarStateClasses =
    isOpen || mounted ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-140 bg-black/30 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-24 flex-col justify-between bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${sidebarStateClasses}`}
      >
        {/* Top section */}
        <div>
          {/* Logo */}
          <div className="flex flex-col items-center py-6 border-b border-gray-200">
            <div className="w-10 h-10 rounded-md bg-[#4F6EF7] flex items-center justify-center text-white font-bold">
              CP
            </div>
          </div>

          {/* Menu */}
          <nav className="mt-4 flex flex-col items-center gap-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-16 h-16 rounded-xl text-xs transition
                  ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F6EF7]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-[10px] text-center leading-tight">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center pb-6 gap-3">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-16 rounded-xl text-xs transition
              ${
                isActive
                  ? "bg-[#EEF2FF] text-[#4F6EF7]"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            <FaCogs className="text-lg mb-1" />
            <span className="text-[10px]">Settings</span>
          </NavLink>

          <div className="text-[9px] text-gray-400">v1.0.0</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;