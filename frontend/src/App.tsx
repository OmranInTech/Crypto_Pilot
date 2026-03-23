// File: src/App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import TrendingCoins from "./pages/TrendingCoins";
import BotHelper from "./pages/BotHelper";
import AutoTrader from "./pages/AutoTrader";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-[#F3F6F9] text-slate-900">
                <Sidebar
                  isOpen={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                />

                <div className="flex flex-1 flex-col md:ml-[98px]">
                  <Navbar
                    isMobileMenuOpen={mobileMenuOpen}
                    onMobileMenuToggle={() =>
                      setMobileMenuOpen((open) => !open)
                    }
                  />

                  <main className="flex-1 pt-16 px-4 pb-4 md:px-8 md:pb-6 transition-all duration-300">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/trending-coins" element={<TrendingCoins />} />
                      <Route path="/bot-helper" element={<BotHelper />} />
                      <Route path="/auto-trader" element={<AutoTrader />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/settings" element={<Settings />} />

                      <Route
                        path="*"
                        element={
                          <div className="p-8 text-center text-gray-500">
                            Page Not Found
                          </div>
                        }
                      />
                    </Routes>
                  </main>

                  <Footer />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;