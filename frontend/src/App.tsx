
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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Layout */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

              <Navbar
                isMobileMenuOpen={mobileMenuOpen}
                onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
              />

              <Sidebar
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
              />

              <main className="flex-grow pt-16 md:pl-24 transition-all duration-300">
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
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

