import { useState, useEffect } from "react";
import { FaUserCircle, FaBell, FaCog, FaBars, FaTimes } from "react-icons/fa";

type NavbarProps = {
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const iconClasses =
    "text-2xl sm:text-3xl cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:text-orange-600";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-white/70 backdrop-blur-md shadow-sm transition-transform duration-500 ${
        mounted ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="mr-3 inline-flex items-center justify-center rounded-lg bg-white/20 p-2 text-orange-600 transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none" aria-hidden="true">
            🎩
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900 drop-shadow-sm">
            Crypto Pilot
          </span>
        </div>

        <div className="ml-auto flex items-center gap-5 pr-4">
          <div className="relative">
            <FaUserCircle className={iconClasses} onClick={() => setUserMenuOpen((open) => !open)} />

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white/95 p-1 shadow-xl ring-1 ring-slate-200 backdrop-blur-sm">
                <ul className="flex flex-col text-slate-800">
                  <li className="rounded-xl px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-800 cursor-pointer transition">
                    Login
                  </li>
                  <li className="rounded-xl px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-800 cursor-pointer transition">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          <FaBell className={iconClasses} />
          <FaCog className={iconClasses} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;