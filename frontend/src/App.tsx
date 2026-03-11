import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Import your pages
import Dashboard from "./pages/Dashboard";
import TrendingCoins from "./pages/TrendingCoins";
import BotHelper from "./pages/BotHelper";
import AutoTrader from "./pages/AutoTrader";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-slate-50 text-slate-900">
        {/* Navbar */}
        <Navbar
          isMobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="pt-16 md:pl-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trending-coins" element={<TrendingCoins />} />
            <Route path="/bot-helper" element={<BotHelper />} />
            <Route path="/auto-trader" element={<AutoTrader />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            {/* 404 fallback */}
            <Route path="*" element={<div className="p-8">Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;