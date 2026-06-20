import React from "react";
import { FaBitcoin, FaRocket, FaWallet, FaRobot, FaChartLine, FaBolt } from "react-icons/fa";
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        fill: true,
        tension: 0.45,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "#1E293B" },
        ticks: { color: "#94A3B8" },
      },
      y: {
        grid: { color: "#1E293B" },
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
      icon: FaWallet,
    },
    {
      title: "Active Bots",
      value: "8",
      change: "+2 Running",
      positive: true,
      icon: FaRobot,
    },
    {
      title: "24H Profit",
      value: "$4,820",
      change: "+$840 Today",
      positive: true,
      icon: FaChartLine,
    },
    {
      title: "Live Market Feed",
      value: "Binance WS",
      change: "Connected",
      positive: true,
      icon: FaBolt,
    },
    {
      title: "Redis Stream",
      value: "Active",
      change: "Streaming",
      positive: true,
      icon: FaBolt,
    },
    {
      title: "Backend Latency",
      value: "24ms",
      change: "Ultra Fast",
      positive: true,
      icon: FaRocket,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Global Overview
          </h1>
          <p className="mt-3 text-slate-400 text-lg">
            Institutional-grade crypto trading intelligence.
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-2xl hover:scale-105 transition-all">
          <FaRocket />
          Launch Smart Bot
        </button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400 text-2xl">
                  <Icon />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  stat.positive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-rose-500/15 text-rose-400"
                }`}>
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-slate-400 text-sm">{stat.title}</p>
              <h2 className="mt-2 text-4xl font-bold">{stat.value}</h2>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">BTC / USD</h2>
              <p className="text-slate-400 mt-1">
                Real-time market performance
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-5 py-3 text-emerald-400 font-semibold">
              <FaBitcoin />
              +8.24%
            </div>
          </div>

          <div className="h-[450px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-6"
        >
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-bold">Market Sentiment</h3>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-slate-400">Bullish</span>
                  <span className="text-emerald-400 font-semibold">78%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-emerald-400" />
                </div>
              </div>

              <div>
                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-slate-400">Bearish</span>
                  <span className="text-rose-400 font-semibold">22%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[22%] rounded-full bg-rose-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-bold">System Status</h3>

            <div className="mt-6 space-y-4 text-sm">
              {[
                "Binance WebSocket Connected",
                "Redis Streaming Active",
                "Django Channels Running",
                "Order Execution Ready",
                "Portfolio Sync Online",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}