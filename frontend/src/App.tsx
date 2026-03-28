import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

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

// 1. Create a Layout Wrapper component for Protected Routes
const ProtectedLayout = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  mobileMenuOpen: boolean, 
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
  return (
    <div className="flex min-h-screen bg-[#F3F6F9] text-slate-900">
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-1 flex-col md:ml-[98px]">
        <Navbar
          isMobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
        />

        <main className="flex-1 pt-16 px-4 pb-4 md:px-8 md:pb-6">
          {/* Outlet is where the child routes (Dashboard, Wallet, etc.) render */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* --- Protected Routes --- */}
        <Route element={<PrivateRoute />}>
          <Route 
            element={
              <ProtectedLayout 
                mobileMenuOpen={mobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen} 
              />
            }
          >
            {/* These paths will render inside the ProtectedLayout's <Outlet /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trending-coins" element={<TrendingCoins />} />
            <Route path="/bot-helper" element={<BotHelper />} />
            <Route path="/auto-trader" element={<AutoTrader />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* --- Global 404 --- */}
        <Route path="*" element={<div className="p-20 text-center font-bold">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;