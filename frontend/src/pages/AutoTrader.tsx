import { useState, useEffect, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const COINS = [
  "BTC",
  "ETH",
  "SOL",
  "DOGE",
  "BNB",
  "ADA",
  "XRP",
  "LTC",
  "DOT",
  "UNI",
  "LINK",
  "AVAX",
  "MATIC",
  "ATOM",
  "TRX",
  "EOS",
  "FTM",
  "ALGO",
  "VET",
  "ICP",
];

function AutoTrader() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [investment, setInvestment] = useState(1000);
  const [botActive, setBotActive] = useState(false);
  const [priceData, setPriceData] = useState([
    45000, 45200, 45100, 45300, 45500, 45400, 45600,
  ]);
  const [volumeData, setVolumeData] = useState([
    100, 120, 80, 140, 130, 150, 160,
  ]);
  const [rsiData, setRsiData] = useState([50, 55, 52, 60, 58, 62, 61]);
  const [macdData, setMacdData] = useState([0, 50, 20, -10, 30, 10, 40]);
  const [portfolioSize, setPortfolioSize] = useState(0);
  const [strategy, setStrategy] = useState<"trend" | "grid" | "scalper">(
    "trend"
  );

  useEffect(() => {
    if (!botActive) return;
    const interval = window.setInterval(() => {
      setPriceData((prev) => {
        const last = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 200;
        const next = Math.max(0, last + change);
        return [...prev.slice(-19), next];
      });
      setVolumeData((prev) => [
        ...prev.slice(-19),
        Math.floor(Math.random() * 200),
      ]);
      setRsiData((prev) => [
        ...prev.slice(-19),
        Math.floor(30 + Math.random() * 40),
      ]);
      setMacdData((prev) => [
        ...prev.slice(-19),
        Math.floor(Math.random() * 50 - 25),
      ]);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [botActive]);

  const startBot = () => {
    setBotActive(true);
    setPortfolioSize(investment / priceData[priceData.length - 1]);
  };

  const lineChartData = {
    labels: priceData.map((_, i) => i + 1),
    datasets: [
      {
        label: "Price",
        data: priceData,
        borderColor: "#4F6EF7",
        backgroundColor: "rgba(79,110,247,0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "MACD",
        data: macdData,
        borderColor: "#F59E0B",
        backgroundColor: "transparent",
        tension: 0.3,
        fill: false,
      },
      {
        label: "RSI",
        data: rsiData,
        borderColor: "#10B981",
        backgroundColor: "transparent",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const volumeChartData = {
    labels: volumeData.map((_, i) => i + 1),
    datasets: [
      { label: "Volume", data: volumeData, backgroundColor: "#9333EA" },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    animation: { duration: 300 },
    scales: {
      y: { grid: { color: "#E5E7EB" } },
      x: { grid: { color: "#E5E7EB" } },
    },
  };

  const hotCoins = useMemo(
    () =>
      COINS.map((c, idx) => {
        const base = c.charCodeAt(0) + c.charCodeAt(c.length - 1) + idx * 7;
        const drift = ((base % 200) - 100) / 10;
        return { name: c, change: drift.toFixed(2) };
      }),
    []
  );

  return (
    <div className="mt-1 space-y-6">
      <motion.div
        className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Auto Trader</h1>
          <p className="text-sm text-gray-500">
            Configure a simulated auto‑trading bot with indicators and live
            price streams for demo purposes.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-semibold text-[#4F6EF7]">
            Strategy sandbox
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-600">
            No real orders
          </span>
        </div>
      </motion.div>

      {/* Bot Setup */}
      <motion.div
        className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Select Coin
          </label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          >
            {COINS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Investment Amount ($)
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) =>
              setStrategy(e.target.value as "trend" | "grid" | "scalper")
            }
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          >
            <option value="trend">Trend following</option>
            <option value="grid">Grid / range</option>
            <option value="scalper">Scalper (fast)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={startBot}
            className="w-full rounded-lg bg-[#4F6EF7] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            {botActive ? "Update Position" : "Start Auto Trader"}
          </button>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            {selectedCoin} price & indicators
          </h2>
          <Line
            data={lineChartData}
            options={{ ...chartOptions, maintainAspectRatio: false }}
          />
        </div>
        <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            Volume profile
          </h2>
          <Bar
            data={volumeChartData}
            options={{ ...chartOptions, maintainAspectRatio: false }}
          />
        </div>
      </motion.div>

      {/* Hot Coins Heatmap */}
      <motion.div
        className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={3}
      >
        <h2 className="text-sm font-semibold text-gray-800">
          Hot Coins & Bot Size
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 md:grid-cols-5">
          {hotCoins.map((coin) => (
            <div
              key={coin.name}
              className={`rounded-lg p-2 text-center ${
                Number(coin.change) >= 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {coin.name}
              <br />
              {coin.change}%
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-600">
          <span>
            Simulated position size:{" "}
            <span className="font-semibold text-gray-800">
              {portfolioSize.toFixed(4)} {selectedCoin}
            </span>
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5">
            Demo only
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default AutoTrader;