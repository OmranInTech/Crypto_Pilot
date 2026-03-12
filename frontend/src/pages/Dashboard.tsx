import { FaBitcoin, FaRocket } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function Dashboard() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "BTC Price",
        data: [32000, 35000, 33000, 38000, 40000, 42000, 45000],
        borderColor: "#4F6EF7",
        backgroundColor: "rgba(79,110,247,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { grid: { color: "#E5E7EB" } }, x: { grid: { color: "#E5E7EB" } } },
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] ml-24 p-8 space-y-6">
      
      {/* Page Title */}
      <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back to Crypto Pilot</p>
      </div>

      {/* Intro Section */}
      <div className="mb-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition transform animate-slideUp" style={{ animationDelay: "0.2s" }}>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#EEF2FF] animate-pulse">
          <FaBitcoin className="text-3xl text-[#4F6EF7]" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">
            Crypto Pilot BTC Trading Bot
          </h2>
          <p className="text-gray-600 mt-1">
            Crypto Pilot is an intelligent Bitcoin trading platform powered by automated bots that analyze the market, track price trends, and execute trades to help maximize your crypto profits.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Monitor your portfolio, track the market, and let our smart bots guide your trading strategy.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2 bg-[#4F6EF7] text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition">
            Start Trading
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Portfolio Value", value: "$45,320", change: "+12.4%", color: "text-green-500" },
          { label: "BTC Holdings", value: "0.84 BTC", change: "$37,500", color: "text-green-500" },
          { label: "Active Bots", value: "3", change: "Auto trading enabled", color: "text-blue-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition transform animate-slideUp" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
            <p className={`${stat.color} text-sm`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Chart + Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition transform animate-slideUp" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-lg font-semibold mb-4">BTC Price Overview</h2>
          <Line data={chartData} options={options} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition transform animate-slideUp" style={{ animationDelay: "0.7s" }}>
          <h2 className="text-lg font-semibold mb-4">Top Assets</h2>
          <div className="space-y-4">
            {[
              { name: "Bitcoin", value: "$45,000", icon: <FaBitcoin className="text-yellow-500" /> },
              { name: "Ethereum", value: "$3,200" },
              { name: "Solana", value: "$140" },
              { name: "BNB", value: "$410" },
            ].map((asset, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-2">{asset.icon}{asset.name}</div>
                <span>{asset.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bot Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition transform animate-slideUp" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-lg font-semibold mb-4">Crypto Pilot Bots</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRocket className="text-blue-500 text-xl" />
            <span className="font-medium">Auto Trading Bot</span>
          </div>
          <button className="px-4 py-2 bg-[#4F6EF7] text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition">
            Manage
          </button>
        </div>
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

export default Dashboard;