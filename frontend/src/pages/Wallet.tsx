import { FaBitcoin, FaEthereum, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Wallet() {
  const walletSummary = [
    { name: "Total Balance", amount: "$12,540", icon: <FaPlus className="text-white" /> },
    { name: "Bitcoin (BTC)", amount: "0.84 BTC", icon: <FaBitcoin className="text-yellow-500" /> },
    { name: "Ethereum (ETH)", amount: "2.5 ETH", icon: <FaEthereum className="text-purple-500" /> },
  ];

  const transactions = [
    { id: 1, type: "Received", coin: "BTC", amount: "0.05", time: "2h ago", direction: "in" },
    { id: 2, type: "Sent", coin: "ETH", amount: "0.2", time: "4h ago", direction: "out" },
    { id: 3, type: "Received", coin: "BTC", amount: "0.1", time: "1d ago", direction: "in" },
    { id: 4, type: "Sent", coin: "ETH", amount: "0.5", time: "2d ago", direction: "out" },
  ];

  return (
    <div className="mt-1 space-y-6">
      {/* Page Title */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
        <p className="text-gray-500">
          Manage your cryptocurrency wallet here. View your balances,
          transaction history, and manage your assets securely.
        </p>
      </motion.div>

      {/* Wallet Summary Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
      >
        {walletSummary.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="transform rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2FF]">
                {item.icon}
              </div>
            </div>
            <h2 className="mt-2 text-xl font-bold">{item.amount}</h2>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="transform rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                {tx.direction === "in" ? (
                  <FaArrowDown className="text-green-500" />
                ) : (
                  <FaArrowUp className="text-red-500" />
                )}
                <span className="font-medium">
                  {tx.type} {tx.amount} {tx.coin}
                </span>
              </div>
              <span className="text-sm text-gray-400">{tx.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default Wallet;