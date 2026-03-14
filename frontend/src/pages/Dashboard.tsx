import { FaBitcoin, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
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

const containerFade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.05, ease: "easeOut" },
  }),
};

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
    <div className="mt-1 space-y-6">
      {/* Page Title */}
      <motion.div
        className="flex items-center justify-between"
        variants={containerFade}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Global Overview</h1>
          <p className="text-gray-500">
            Your high‑level snapshot of bots, portfolio and market.
          </p>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[#4F6EF7] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <FaRocket />
          Launch Smart Bot
        </button>
      </motion.div>

      {/* Intro + quick KPIs */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        custom={0.5}
        variants={containerFade}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,110,247,0.14),_transparent_55%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF] shadow-inner">
                <FaBitcoin className="text-3xl text-[#4F6EF7]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Crypto Pilot Control Center
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  One place for live PnL, risk, and bot automation across all
                  your exchanges.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap justify-end gap-4 text-sm">
              <div className="rounded-xl bg-[#F3F6FF] px-4 py-2">
                <p className="text-xs text-gray-500">24h PnL</p>
                <p className="text-sm font-semibold text-green-500">+4.8%</p>
              </div>
              <div className="rounded-xl bg-[#F3F6FF] px-4 py-2">
                <p className="text-xs text-gray-500">Risk Level</p>
                <p className="text-sm font-semibold text-[#4F6EF7]">
                  Balanced
                </p>
              </div>
              <div className="rounded-xl bg-[#F3F6FF] px-4 py-2">
                <p className="text-xs text-gray-500">Active Strategies</p>
                <p className="text-sm font-semibold text-gray-800">5</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Session Health
            </p>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">
              Stable
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#4F6EF7] to-[#10B981]" />
          </div>
          <p className="text-xs text-gray-500">
            Bots are trading normally. No risk alerts triggered in the last
            hour.
          </p>
        </motion.div>
      </motion.div>

      {/* Top Stats */}
      <motion.div
        className="grid gap-6 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={containerFade}
      >
        {[
          {
            label: "Portfolio Value",
            value: "$45,320",
            change: "+12.4%",
            color: "text-green-500",
            sub: "vs last 7 days",
          },
          {
            label: "BTC Holdings",
            value: "0.84 BTC",
            change: "$37,500",
            color: "text-green-500",
            sub: "Spot + derivatives",
          },
          {
            label: "Active Bots",
            value: "3",
            change: "Auto trading on",
            color: "text-[#4F6EF7]",
            sub: "Grid • Scalper • Trend",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            custom={1 + idx * 0.1}
            variants={containerFade}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F6EF7] via-[#10B981] to-[#4F6EF7] opacity-70" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {stat.value}
            </h2>
            <p className={`${stat.color} mt-0.5 text-sm`}>{stat.change}</p>
            <p className="mt-2 text-xs text-gray-500">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart + Portfolio */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        custom={1.2}
        variants={containerFade}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2"
          whileHover={{ y: -4 }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                BTC Price Overview
              </h2>
              <p className="text-xs text-gray-500">
                Synthetic price feed for visualisation only.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {["1H", "4H", "1D", "1W"].map((tf, i) => (
                <button
                  key={tf}
                  className={`rounded-full px-3 py-1 ${
                    i === 2
                      ? "bg-[#4F6EF7] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[220px]">
            <Line
              data={chartData}
              options={{ ...options, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          whileHover={{ y: -4 }}
        >
          <h2 className="text-sm font-semibold text-gray-800">Top Assets</h2>
          <div className="space-y-3 text-sm">
            {[
              {
                name: "Bitcoin",
                value: "$45,000",
                weight: "58% of portfolio",
                icon: <FaBitcoin className="text-yellow-500" />,
              },
              {
                name: "Ethereum",
                value: "$3,200",
                weight: "26% of portfolio",
              },
              { name: "Solana", value: "$140", weight: "9% of portfolio" },
              { name: "BNB", value: "$410", weight: "7% of portfolio" },
            ].map((asset) => (
              <div
                key={asset.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF]">
                    {asset.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{asset.name}</p>
                    <p className="text-[11px] text-gray-500">{asset.weight}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {asset.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bots + activity */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        custom={1.4}
        variants={containerFade}
      >
        <motion.div
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">
              Active Bots
            </h2>
            <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-xs font-semibold text-[#4F6EF7]">
              Live
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-3 text-sm">
            {[
              {
                name: "BTC Trend Rider",
                mode: "Trend following",
                pnl: "+2.1% today",
              },
              {
                name: "ETH Grid Alpha",
                mode: "Grid / market‑neutral",
                pnl: "+0.8% today",
              },
              {
                name: "Scalper X",
                mode: "High‑freq scalping",
                pnl: "+1.3% today",
              },
            ].map((bot) => (
              <div
                key={bot.name}
                className="rounded-xl border border-gray-200 bg-[#FAFBFF] p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-800">
                    {bot.name}
                  </span>
                  <span className="text-[11px] font-semibold text-green-500">
                    {bot.pnl}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">{bot.mode}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          whileHover={{ y: -4 }}
        >
          <h2 className="text-sm font-semibold text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex justify-between">
              <span>BTC Trend Rider closed 3 positions</span>
              <span className="text-gray-400">5m ago</span>
            </li>
            <li className="flex justify-between">
              <span>New ML signal generated for ETH</span>
              <span className="text-gray-400">22m ago</span>
            </li>
            <li className="flex justify-between">
              <span>Auto risk rebalance executed</span>
              <span className="text-gray-400">1h ago</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;