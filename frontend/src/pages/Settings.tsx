import { useState } from "react";

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

  const [subscription, setSubscription] = useState("Free Plan");

  // Handlers
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWallet = () => {
    const walletName = prompt("Enter new wallet name:");
    if (walletName) setWallets((prev) => [...prev, { name: walletName, balance: 0 }]);
  };

  const handleDeleteWallet = (index) => {
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
    <div className="min-h-screen bg-[#F3F6F9] p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

      {/* Account Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition space-y-4">
        <h2 className="text-xl font-semibold">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleAccountChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleAccountChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleAccountChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Save Changes
        </button>
      </div>

      {/* Wallet Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition space-y-4">
        <h2 className="text-xl font-semibold">Wallet Management</h2>
        <ul className="space-y-2">
          {wallets.map((w, idx) => (
            <li key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span>{w.name}: {w.balance} coins</span>
              <button
                onClick={() => handleDeleteWallet(idx)}
                className="bg-red-500 px-2 py-1 text-white rounded-lg hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddWallet}
          className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Wallet
        </button>
      </div>

      {/* Subscription & Plan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition space-y-4">
        <h2 className="text-xl font-semibold">Subscription & Plan</h2>
        <p>Current Plan: <span className="font-bold">{subscription}</span></p>
        <button className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition">
          Upgrade Plan
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <p className="text-gray-600">Deleting your account is permanent and cannot be undone.</p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;