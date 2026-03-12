import { FaBitcoin, FaEthereum, FaDog, FaRocket, FaArrowUp } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function TrendingCoins() {
  const topCoins = [
    { name: "Bitcoin", symbol: "BTC", price: "$45,000", change: "+3.2%", icon: <FaBitcoin className="text-yellow-500" />, sparkline: [44000, 44200, 44300, 44500, 44400, 44600, 45000] },
    { name: "Ethereum", symbol: "ETH", price: "$3,200", change: "+5.1%", icon: <FaEthereum className="text-purple-500" />, sparkline: [3100, 3150, 3120, 3180, 3200, 3250, 3280] },
    { name: "Dogecoin", symbol: "DOGE", price: "$0.18", change: "+12%", icon: <FaDog className="text-pink-400" />, sparkline: [0.15, 0.16, 0.17, 0.175, 0.18, 0.185, 0.18] },
    { name: "Solana", symbol: "SOL", price: "$140", change: "+4.5%", icon: <FaRocket className="text-green-400" />, sparkline: [130, 132, 135, 138, 140, 142, 141] },
  ];

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { label: "BTC Price", data: [44000, 44500, 44300, 45000, 45200, 45500, 46000], borderColor: "#4F6EF7", backgroundColor: "rgba(79,110,247,0.1)", tension: 0.4, fill: true },
    ],
  };

  const pieData = {
    labels: ["BTC", "ETH", "SOL", "DOGE"],
    datasets: [{ data: [45, 25, 20, 10], backgroundColor: ["#FBBF24", "#7C3AED", "#10B981", "#F472B6"] }],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { grid: { color: "#E5E7EB" } }, x: { grid: { color: "#E5E7EB" } } },
    elements: { point: { radius: 0 } },
  };

  const pieOptions = { responsive: true, plugins: { legend: { position: "bottom" } } };

  const news = [
    { title: "Bitcoin Hits New Weekly High", time: "2h ago" },
    { title: "Ethereum Up 5% Amid Market Optimism", time: "4h ago" },
    { title: "Solana Gains Momentum", time: "6h ago" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 animate-slideUp">Trending Coins</h1>
      <p className="text-gray-500 animate-slideUp" style={{ animationDelay: "0.1s" }}>
        Discover the hottest cryptocurrencies in the market right now. Stay updated with the latest trends and make informed decisions.
      </p>

      {/* Top Coins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topCoins.map((coin, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition transform animate-slideUp"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EEF2FF] animate-pulse">
                {coin.icon}
              </div>
              <h2 className="text-md font-semibold text-gray-800">{coin.name}</h2>
            </div>
            <p className="text-gray-500 text-sm">{coin.symbol}</p>
            <h3 className="text-lg font-bold mt-1">{coin.price}</h3>
            <p className={`text-sm font-medium ${coin.change.includes("+") ? "text-green-500" : "text-red-500"}`}>{coin.change}</p>
            <div className="mt-2 h-12">
              <Line
                data={{
                  labels: coin.sparkline.map((_, i) => i + 1),
                  datasets: [{ data: coin.sparkline, borderColor: coin.change.includes("+") ? "#10B981" : "#EF4444", backgroundColor: "transparent", tension: 0.3, fill: false }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } }, elements: { point: { radius: 0 } } }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-md font-semibold mb-2">BTC Price Overview</h2>
          <Line data={lineData} options={lineOptions} height={120} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-md font-semibold mb-2">Market Distribution</h2>
          <Pie data={pieData} options={pieOptions} height={120} />
        </div>
      </div>

      {/* Market Thermometer & Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp" style={{ animationDelay: "0.7s" }}>
          <h2 className="text-md font-semibold mb-2">Market Status</h2>
          <div className="relative h-4 bg-gray-200 rounded-full">
            <div className="absolute h-4 rounded-full bg-green-500 animate-pulse" style={{ width: "65%" }}></div>
          </div>
          <p className="text-gray-500 text-sm mt-1">Market is 65% bullish today</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-md font-semibold mb-2">Top Movers</h2>
          <ul className="space-y-1 text-sm">
            {topCoins.map((coin, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{coin.symbol}</span>
                <span className="text-green-500"><FaArrowUp className="inline mr-1"/> {coin.change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fake News */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp" style={{ animationDelay: "0.9s" }}>
        <h2 className="text-md font-semibold mb-2">Crypto News</h2>
        <ul className="space-y-1 text-sm">
          {news.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tailwind Animation */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default TrendingCoins;