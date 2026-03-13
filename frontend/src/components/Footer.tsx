import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 bg-white border-t border-gray-200 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} CryptoPilot. All rights reserved.
    </footer>
  );
};

export default Footer;