import { useEffect, useState } from "react";
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
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // =========================
  // WEBSOCKET CONNECTION
  // =========================
  useEffect(() => {
    const socketRef = { current: null as WebSocket | null };
    let reconnectTimer: number | null = null;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const websocketUrl = `${protocol}://127.0.0.1:8001/ws/crypto/`;

    const connect = () => {
      const socket = new WebSocket(websocketUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("🚀 WebSocket Connected");
        setConnected(true);
        setRetryCount(0);
        socket.send(JSON.stringify({ type: "get_prices" }));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.prices) {
            setPrices(data.prices);
          }
        } catch (err) {
          console.log("Invalid WS message:", err);
        }
      };

      socket.onerror = (err) => {
        console.log("WebSocket Error:", err);
        setConnected(false);
      };

      socket.onclose = (event) => {
        console.log("WebSocket Disconnected ❌", event.code, event.reason);
        setConnected(false);

        if (event.code !== 1000) {
          if (reconnectTimer) {
            window.clearTimeout(reconnectTimer);
          }
          reconnectTimer = window.setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            connect();
          }, 2500);
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // =========================
  // COINS DATA (LIVE PRICES)
  // =========================
  const topCoins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: prices.BTC ? `$${prices.BTC}` : "Loading...",
      change: "+3.2%",
      icon: <FaBitcoin className="text-yellow-500" />,
      sparkline: [44000, 44200, 44300, 44500, 44400, 44600, 45000],
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: prices.ETH ? `$${prices.ETH}` : "Loading...",
      change: "+5.1%",
      icon: <FaEthereum className="text-purple-500" />,
      sparkline: [3100, 3150, 3120, 3180, 3200, 3250, 3280],
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: prices.DOGE ? `$${prices.DOGE}` : "Loading...",
      change: "+12%",
      icon: <FaDog className="text-pink-400" />,
      sparkline: [0.15, 0.16, 0.17, 0.175, 0.18, 0.185, 0.18],
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: prices.SOL ? `$${prices.SOL}` : "Loading...",
      change: "+4.5%",
      icon: <FaRocket className="text-green-400" />,
      sparkline: [130, 132, 135, 138, 140, 142, 141],
    },
  ];

  // =========================
  // CHART DATA
  // =========================
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "BTC Price",
        data: [44000, 44500, 44300, 45000, 45200, 45500, 46000],
        borderColor: "#4F6EF7",
        backgroundColor: "rgba(79,110,247,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["BTC", "ETH", "SOL", "DOGE"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#FBBF24", "#7C3AED", "#10B981", "#F472B6"],
      },
    ],
  };

  return (
    <div className="mt-1 space-y-6">

      {/* STATUS */}
      <div className="text-sm">
        Status:{" "}
        <span className={connected ? "text-green-500" : "text-red-500"}>
          {connected ? "Live Connected 🚀" : retryCount > 0 ? `Reconnecting… (${retryCount})` : "Disconnected ❌"}
        </span>
      </div>

      {/* HEADER */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-2xl font-bold text-gray-800">Trending Coins</h1>
        <p className="text-gray-500">
          Live crypto prices powered by Django + Celery + Redis + WebSockets ⚡
        </p>
      </motion.div>

      {/* COINS */}
      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {topCoins.map((coin) => (
          <motion.div
            key={coin.symbol}
            whileHover={{ y: -4 }}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF]">
                {coin.icon}
              </div>
              <h2 className="font-semibold">{coin.name}</h2>
            </div>

            <p className="text-sm text-gray-500">{coin.symbol}</p>

            <h3 className="mt-1 text-lg font-bold">{coin.price}</h3>

            <p className="text-sm text-green-500">{coin.change}</p>

            <div className="mt-2 h-12">
              <Line
                data={{
                  labels: coin.sparkline.map((_, i) => i),
                  datasets: [
                    {
                      data: coin.sparkline,
                      borderColor: "#10B981",
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 border p-4 rounded-2xl">
          <h2 className="font-semibold mb-2">BTC Overview</h2>
          <Line data={lineData} />
        </div>

        <div className="border p-4 rounded-2xl">
          <h2 className="font-semibold mb-2">Market Share</h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* MOVERS */}
      <div className="border p-4 rounded-2xl">
        <h2 className="font-semibold mb-2">Top Movers</h2>
        <ul>
          {topCoins.map((coin) => (
            <li key={coin.symbol} className="flex justify-between">
              <span>{coin.symbol}</span>
              <span className="text-green-500">
                <FaArrowUp className="inline mr-1" />
                {coin.change}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default TrendingCoins;