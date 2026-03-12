import { FaBitcoin, FaEthereum, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";

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
    <div className="min-h-screen bg-[#F3F6F9] p-6 space-y-6">

      {/* Page Title */}
      <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
        <p className="text-gray-500">
          Manage your cryptocurrency wallet here. View your balances, transaction history, and manage your assets securely.
        </p>
      </div>

      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {walletSummary.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition transform animate-slideUp"
            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-800 font-semibold">{item.name}</div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EEF2FF]">
                {item.icon}
              </div>
            </div>
            <h2 className="text-xl font-bold mt-2">{item.amount}</h2>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition transform animate-slideUp" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                {tx.direction === "in" ? (
                  <FaArrowDown className="text-green-500" />
                ) : (
                  <FaArrowUp className="text-red-500" />
                )}
                <span className="font-medium">{tx.type} {tx.amount} {tx.coin}</span>
              </div>
              <span className="text-gray-400 text-sm">{tx.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tailwind Slide Up Animation */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Wallet;