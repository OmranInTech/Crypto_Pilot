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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const containerFade = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function Dashboard() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "BTC Price",
        data: [32000, 35000, 33000, 38000, 40000, 42000, 45000],
        borderColor: "#00C2FF",
        backgroundColor: "rgba(0,194,255,0.12)",
        tension: 0.45,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: "#1F2937" },
        ticks: { color: "#94A3B8" },
      },
      y: {
        grid: { color: "#1F2937" },
        ticks: { color: "#94A3B8" },
      },
    },
  };

  const stats = [
    {
      title: "Portfolio Balance",
      value: "$128,450",
      change: "+12.4%",
      positive: true,
    },
    {
      title: "Active Bots",
      value: "8",
      change: "+2",
      positive: true,
    },
    {
      title: "24H Profit",
      value: "$4,820",
      change: "-1.8%",
      positive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        variants={containerFade}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Global Overview
          </h1>
          <p className="mt-2 text-slate-400">
            Your real-time trading intelligence center.
          </p>
        </div>

        <button className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105">
          <FaRocket className="text-lg" />
          Launch Smart Bot
        </button>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        variants={containerFade}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl"
          >
            <p className="text-sm text-slate-400">{stat.title}</p>
            <h2 className="mt-3 text-4xl font-bold text-white">
              {stat.value}
            </h2>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                stat.positive
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-rose-500/15 text-rose-400"
              }`}
            >
              {stat.change}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Chart */}
        <motion.div
          className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl"
          variants={containerFade}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">BTC / USD</h2>
              <p className="text-slate-400">Live market performance</p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-2 text-emerald-400">
              <FaBitcoin />
              +8.24%
            </div>
          </div>

          <div className="h-[420px]">
            <Line data={chartData} options={options} />
          </div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          className="space-y-6"
          variants={containerFade}
          initial="hidden"
          animate="visible"
        >
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold">Market Sentiment</h3>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-400">Bullish</span>
                  <span className="text-emerald-400">78%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className="h-3 w-[78%] rounded-full bg-emerald-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-400">Bearish</span>
                  <span className="text-rose-400">22%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className="h-3 w-[22%] rounded-full bg-rose-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold">Top Performer</h3>

            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-2xl bg-orange-500/10 p-4 text-3xl text-orange-400">
                <FaBitcoin />
              </div>

              <div>
                <h4 className="text-lg font-semibold">Bitcoin</h4>
                <p className="text-slate-400">BTC</p>
              </div>
            </div>

            <p className="mt-6 text-4xl font-bold">$45,000</p>
            <p className="mt-2 text-emerald-400">+15.8% this month</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}