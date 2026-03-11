import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  // Main menu items (without Settings)
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Trending Coins", icon: <FaChartLine />, path: "/trending-coins" },
    { name: "Bot Helper", icon: <FaRobot />, path: "/bot-helper" },
    { name: "Bot Auto Trader", icon: <FaToolbox />, path: "/auto-trader" },
    { name: "Wallet", icon: <FaWallet />, path: "/wallet" },
  ];

  const sidebarStateClasses =
    isOpen || mounted ? "translate-x-0" : "-translate-x-full";

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between overflow-hidden bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white shadow-2xl transition-transform duration-300 ease-out md:translate-x-0 ${sidebarStateClasses}`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="text-2xl">🎩</span>
            <span className="text-lg font-semibold tracking-tight">
              Crypto Pilot
            </span>
          </div>

          {/* Main Menu */}
          <nav className="mt-4 px-2">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 shadow-lg text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom: Settings + Version */}
        <div className="px-4 pb-6">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm transition duration-200 ${
                isActive
                  ? "bg-white/20 shadow-lg text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <FaCogs className="text-lg" />
            <span>Settings</span>
          </NavLink>

          <div className="mt-3 text-xs text-white/80">v1.0.0</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;