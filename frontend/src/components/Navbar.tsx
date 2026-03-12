import { useState, useEffect } from "react";
import { FaUserCircle, FaBell, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  onMobileMenuToggle,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const navigate = useNavigate();

  // Simulate login status
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const iconClasses =
    "text-xl text-gray-500 cursor-pointer transition hover:text-[#4F6EF7]";

  // User menu actions
  const handleProfile = () => {
    setUserMenuOpen(false);
    navigate("/settings");
  };
  const handleSettings = () => {
    setUserMenuOpen(false);
    navigate("/settings");
  };
  const handleSignIn = () => {
    setUserMenuOpen(false);
    navigate("/signin");
  };
  const handleSignUp = () => {
    setUserMenuOpen(false);
    navigate("/signup");
  };
  const handleLogout = () => {
    setUserMenuOpen(false);
    setLoggedIn(false);
    alert("Logged out!");
    navigate("/signin");
  };

  const handleLoginSimulation = () => setLoggedIn(true); // just for demo

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-transform duration-500 ${
        mounted ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <div className="flex h-16 items-center px-6">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="md:hidden mr-4 text-gray-600 hover:text-[#4F6EF7]"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-6">
          {/* Notification */}
          <FaBell className={iconClasses} />

          {/* Settings */}
          <FaCog className={iconClasses} onClick={handleSettings} />

          {/* User Menu */}
          <div className="relative">
            <FaUserCircle
              className="text-2xl text-gray-500 cursor-pointer hover:text-[#4F6EF7]"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-md">
                <ul className="text-sm text-gray-700">
                  {loggedIn ? (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleProfile}
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleSignIn}
                      >
                        Sign In
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-600"
                        onClick={handleLoginSimulation}
                      >
                        Demo Login
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;