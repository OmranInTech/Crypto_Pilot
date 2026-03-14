import { useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Settings() {
  const [account, setAccount] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  });

  const [wallets, setWallets] = useState([
    { name: "BTC Wallet", balance: 0.84 },
    { name: "ETH Wallet", balance: 2.5 },
  ]);

  const [subscription] = useState("Free Plan");

  // Handlers
  const handleAccountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWallet = () => {
    const walletName = prompt("Enter new wallet name:");
    if (walletName) setWallets((prev) => [...prev, { name: walletName, balance: 0 }]);
  };

  const handleDeleteWallet = (index: number) => {
    if (confirm("Are you sure you want to delete this wallet?")) {
      setWallets((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted!"); // Implement real deletion in backend
    }
  };

  return (
    <div className="mt-1 space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Settings</h1>
      </motion.div>

      {/* Account Details */}
      <motion.div
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
      >
        <h2 className="text-xl font-semibold">Account Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleAccountChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleAccountChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleAccountChange}
              placeholder="Enter new password"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
            />
          </div>
        </div>
        <button className="rounded-lg bg-[#4F6EF7] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          Save Changes
        </button>
      </motion.div>

      {/* Wallet Management */}
      <motion.div
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <h2 className="text-xl font-semibold">Wallet Management</h2>
        <ul className="space-y-2 text-sm">
          {wallets.map((w, idx) => (
            <li
              key={w.name}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
            >
              <span>
                {w.name}: {w.balance} coins
              </span>
              <button
                onClick={() => handleDeleteWallet(idx)}
                className="rounded-lg bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddWallet}
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
        >
          Add Wallet
        </button>
      </motion.div>

      {/* Subscription & Plan */}
      <motion.div
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={3}
      >
        <h2 className="text-xl font-semibold">Subscription & Plan</h2>
        <p className="text-sm">
          Current Plan:{" "}
          <span className="font-bold text-gray-800">{subscription}</span>
        </p>
        <button className="rounded-lg bg-[#4F6EF7] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          Upgrade Plan
        </button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={4}
      >
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-600">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}

export default Settings;