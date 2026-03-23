import { FaBitcoin, FaEthereum, FaDog, FaRocket, FaArrowUp } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

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

  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" as const } },
  };

  const news = [
    { title: "Bitcoin Hits New Weekly High", time: "2h ago" },
    { title: "Ethereum Up 5% Amid Market Optimism", time: "4h ago" },
    { title: "Solana Gains Momentum", time: "6h ago" },
  ];

  return (
    <div className="mt-1 space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <h1 className="text-2xl font-bold text-gray-800">Trending Coins</h1>
        <p className="text-gray-500">
          Discover the hottest cryptocurrencies in the market right now. Stay
          updated with the latest trends and make informed decisions.
        </p>
      </motion.div>

      {/* Top Coins */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
      >
        {topCoins.map((coin) => (
          <motion.div
            key={coin.symbol}
            whileHover={{ y: -4 }}
            className="transform rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition"
          >
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF]">
                {coin.icon}
              </div>
              <h2 className="text-md font-semibold text-gray-800">
                {coin.name}
              </h2>
            </div>
            <p className="text-sm text-gray-500">{coin.symbol}</p>
            <h3 className="mt-1 text-lg font-bold">{coin.price}</h3>
            <p
              className={`text-sm font-medium ${
                coin.change.includes("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coin.change}
            </p>
            <div className="mt-2 h-12">
              <Line
                data={{
                  labels: coin.sparkline.map((_, i) => i + 1),
                  datasets: [
                    {
                      data: coin.sparkline,
                      borderColor: coin.change.includes("+")
                        ? "#10B981"
                        : "#EF4444",
                      backgroundColor: "transparent",
                      tension: 0.3,
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                  elements: { point: { radius: 0 } },
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-md font-semibold text-gray-800">
            BTC Price Overview
          </h2>
          <div className="h-[180px]">
            <Line
              data={lineData}
              options={{ ...lineOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-md font-semibold text-gray-800">
            Market Distribution
          </h2>
          <div className="h-[160px]">
            <Pie
              data={pieData}
              options={{ ...pieOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </motion.div>

      {/* Market Thermometer & Movers */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={3}
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-md font-semibold text-gray-800">
            Market Status
          </h2>
          <div className="relative h-4 rounded-full bg-gray-200">
            <div
              className="absolute h-4 rounded-full bg-green-500"
              style={{ width: "65%" }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Market is 65% bullish today
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-md font-semibold text-gray-800">
            Top Movers
          </h2>
          <ul className="space-y-1 text-sm">
            {topCoins.map((coin) => (
              <li key={coin.symbol} className="flex justify-between">
                <span>{coin.symbol}</span>
                <span className="text-green-500">
                  <FaArrowUp className="mr-1 inline" />
                  {coin.change}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Fake News */}
      <motion.div
        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={4}
      >
        <h2 className="mb-2 text-md font-semibold text-gray-800">
          Crypto News
        </h2>
        <ul className="space-y-1 text-sm">
          {news.map((item) => (
            <li key={item.title} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default TrendingCoins;