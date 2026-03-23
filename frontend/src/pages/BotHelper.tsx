import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

type StrategyId = "scalping" | "swing" | "grid";
type MlModelId = "lstm" | "transformer" | "randomForest";

function BotHelper() {
  const coins = ["BTC", "ETH", "SOL", "DOGE", "BNB", "ADA"];
  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;

  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [timeframe, setTimeframe] =
    useState<(typeof timeframes)[number]>("15m");
  const [priceData, setPriceData] = useState([
    45000, 45200, 45100, 45300, 45500, 45400, 45600,
  ]);
  const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({
    BTC: 0,
    USD: 10000,
  });
  const [strategy, setStrategy] = useState<StrategyId>("scalping");
  const [mlModel, setMlModel] = useState<MlModelId>("transformer");

  // Simulate live coin price changes based on timeframe "speed"
  useEffect(() => {
    const speedMultiplier = {
      "1m": 700,
      "5m": 1100,
      "15m": 1500,
      "1h": 1900,
      "4h": 2400,
      "1d": 3000,
    }[timeframe];

    const interval = window.setInterval(() => {
      setPriceData((prev) => {
        const last = prev[prev.length - 1];
        const volatility =
          timeframe === "1m" || timeframe === "5m"
            ? 260
            : timeframe === "15m" || timeframe === "1h"
            ? 180
            : 120;
        const change = (Math.random() - 0.5) * volatility;
        const next = Math.max(0, last + change);
        return [...prev.slice(-29), next];
      });
    }, speedMultiplier);

    return () => window.clearInterval(interval);
  }, [selectedCoin, timeframe]);

  // Compute helper signal from current data (no side-effect state update)
  const signal = useMemo(() => {
    const lastPrice = priceData[priceData.length - 1];
    const prevPrice = priceData[priceData.length - 2] || lastPrice;
    const momentum = lastPrice - prevPrice;

    let bias = 0;
    if (strategy === "scalping") bias += 0.3;
    if (strategy === "swing") bias += 0.1;
    if (mlModel === "transformer") bias += 0.2;

    const thresholdUp = 1.01 - bias * 0.02;
    const thresholdDown = 0.99 + bias * 0.02;

    if (lastPrice > prevPrice * thresholdUp && momentum > 0) return "SELL";
    else if (lastPrice < prevPrice * thresholdDown && momentum < 0)
      return "BUY";
    return "HOLD";
  }, [priceData, strategy, mlModel]);

  const handleBuy = () => {
    const lastPrice = priceData[priceData.length - 1];
    const amountToBuy = Math.min(portfolio.USD / lastPrice, 1); // buy 1 coin max

    if (!amountToBuy || amountToBuy <= 0) return;

    setPortfolio((prev) => ({
      ...prev,
      USD: prev.USD - amountToBuy * lastPrice,
      [selectedCoin]: (prev[selectedCoin] || 0) + amountToBuy,
    }));
    alert(
      `Bought ${amountToBuy.toFixed(4)} ${selectedCoin} at $${lastPrice.toFixed(
        2
      )}`
    );
  };

  const handleSell = () => {
    const lastPrice = priceData[priceData.length - 1];
    const amountToSell = Math.min(portfolio[selectedCoin] || 0, 1);

    if (!amountToSell || amountToSell <= 0) return;

    setPortfolio((prev) => ({
      ...prev,
      USD: prev.USD + amountToSell * lastPrice,
      [selectedCoin]: (prev[selectedCoin] || 0) - amountToSell,
    }));
    alert(
      `Sold ${amountToSell.toFixed(4)} ${selectedCoin} at $${lastPrice.toFixed(
        2
      )}`
    );
  };

  const chartData = {
    labels: priceData.map((_, i) => i + 1),
    datasets: [
      {
        label: `${selectedCoin} • ${timeframe}`,
        data: priceData,
        borderColor: "#4F6EF7",
        backgroundColor: "rgba(79,110,247,0.12)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 320 },
    scales: {
      y: { grid: { color: "#E5E7EB" } },
      x: { grid: { color: "rgba(229,231,235,0.4)" } },
    },
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Bot Helper</h1>
          <p className="text-sm text-gray-500">
            Configure coin, timeframe, strategy and ML model – the helper
            generates live guidance only for visual demo purposes.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-green-50 px-3 py-1 font-semibold text-green-600">
            Live simulation
          </span>
          <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-semibold text-[#4F6EF7]">
            Paper trading only
          </span>
        </div>
      </motion.div>

      {/* Configuration row */}
      <motion.div
        className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
      >
        <div>
          <label className="text-xs font-medium text-gray-600">Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          >
            {coins.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">
            Timeframe
          </label>
          <div className="mt-1 flex flex-wrap gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`rounded-full px-3 py-1 text-xs ${
                  timeframe === tf
                    ? "bg-[#4F6EF7] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">
            Strategy preset
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as StrategyId)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          >
            <option value="scalping">Scalping (high frequency)</option>
            <option value="swing">Swing (mid‑term)</option>
            <option value="grid">Grid (range trading)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">
            ML model selection
          </label>
          <select
            value={mlModel}
            onChange={(e) => setMlModel(e.target.value as MlModelId)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]"
          >
            <option value="transformer">Transformer (default)</option>
            <option value="lstm">LSTM sequence model</option>
            <option value="randomForest">Random Forest baseline</option>
          </select>
        </div>
      </motion.div>

      {/* Chart + signal + controls */}
      <motion.div
        className="grid gap-4 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <div className="lg:col-span-2 space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {selectedCoin} candlestick‑style chart
              </h2>
              <p className="text-xs text-gray-500">
                Dummy data – use your own real feed in production.
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="text-gray-500">
                Helper signal:{" "}
                <span
                  className={`font-bold ${
                    signal === "BUY"
                      ? "text-green-600"
                      : signal === "SELL"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {signal || "WAIT"}
                </span>
              </p>
            </div>
          </div>

          <div className="h-[260px]">
            <Line
              data={chartData}
              options={{ ...chartOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-sm">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Quick trade panel
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Simulated paper trades using the current helper signal.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#F3F6FF] p-3">
            <p className="text-xs text-gray-600">
              Last price (synthetic)
              <br />
              <span className="text-sm font-semibold text-gray-900">
                ${priceData[priceData.length - 1].toFixed(2)}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleBuy}
                className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-600"
              >
                Buy
              </button>
              <button
                onClick={handleSell}
                className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-600"
              >
                Sell
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700">
              Strategy explanation
            </h3>
            <p className="mt-1 text-[11px] text-gray-500">
              The selected strategy and ML model only change how the{" "}
              <strong>demo signal</strong> is computed. Connect your own API to
              plug real models and executions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Portfolio / positions + small heat / buy-sell visual */}
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={3}
      >
        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:col-span-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Paper portfolio overview
          </h2>
          <p className="text-xs text-gray-500">
            Simple simulated balances – ideal for testing helper logic before
            wiring to real exchanges.
          </p>
          <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl bg-[#F3F6FF] p-3">
              <p className="text-xs text-gray-500">USD balance</p>
              <p className="text-lg font-semibold text-gray-900">
                ${portfolio.USD.toFixed(2)}
              </p>
            </div>
            {coins.map((c) => (
              <div key={c} className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">{c}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {(portfolio[c] || 0).toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-xs">
          <h2 className="text-sm font-semibold text-gray-800">
            Helper notes & micro heat
          </h2>
          <ul className="space-y-1 text-gray-600">
            <li>• Signals combine short‑term momentum and dummy ML bias.</li>
            <li>• Use 1m / 5m for scalping visualisation.</li>
            <li>• Use 1h+ for swing and grid behaviour.</li>
            <li>• Replace this logic with your backend to go live.</li>
          </ul>
          <div className="mt-2 space-y-2">
            <p className="text-[11px] text-gray-500">Buy vs Sell ratio</p>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-green-400" />
              <div className="absolute inset-y-0 right-0 w-1/3 rounded-full bg-red-400" />
            </div>
            <p className="text-[11px] text-gray-500">Market micro‑heat</p>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 rounded ${
                    idx % 3 === 0
                      ? "bg-green-300"
                      : idx % 3 === 1
                      ? "bg-yellow-300"
                      : "bg-red-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BotHelper;