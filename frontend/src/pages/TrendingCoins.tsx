import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBitcoin,
  FaEthereum,
  FaDog,
  FaRocket,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { createCryptoSocket } from "../services/websocket";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

type Prices = Record<string, number>;

const COINS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: FaBitcoin,
    color: "#F7931A",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: FaEthereum,
    color: "#627EEA",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    icon: FaDog,
    color: "#C2A633",
  },
  {
    symbol: "SOL",
    name: "Solana",
    icon: FaRocket,
    color: "#14F195",
  },
];

function TrendingCoins() {
  const [prices, setPrices] = useState<Prices>({});
  const [previous, setPrevious] = useState<Prices>({});
  const [connected, setConnected] = useState(false);
  const [selected, setSelected] = useState("BTC");

  const [history, setHistory] = useState<Record<string, number[]>>({
    BTC: [],
    ETH: [],
    DOGE: [],
    SOL: [],
  });

  const [trades, setTrades] = useState<any[]>([]);

  const flashRef = useRef<Record<string, "up" | "down" | null>>({
    BTC: null,
    ETH: null,
    DOGE: null,
    SOL: null,
  });

  useEffect(() => {
    return createCryptoSocket(
      (incoming) => {
        setPrices((prev) => {
          const merged = { ...prev, ...incoming };

          setPrevious(prev);

          Object.entries(incoming).forEach(([symbol, price]) => {
            if (prev[symbol]) {
              flashRef.current[symbol] =
                price > prev[symbol] ? "up" : "down";

              setTimeout(() => {
                flashRef.current[symbol] = null;
              }, 350);
            }

            setHistory((h) => ({
              ...h,
              [symbol]: [...(h[symbol] || []), price].slice(-40),
            }));

            setTrades((old) => [
              {
                id: crypto.randomUUID(),
                symbol,
                price,
                side: Math.random() > 0.5 ? "BUY" : "SELL",
                qty: (Math.random() * 2).toFixed(4),
                time: new Date().toLocaleTimeString(),
              },
              ...old.slice(0, 24),
            ]);
          });

          return merged;
        });
      },
      setConnected
    );
  }, []);

  const selectedHistory = useMemo(
    () =>
      (history[selected] || []).map((price, index) => ({
        time: index,
        price,
      })),
    [history, selected]
  );

  const heatmap = COINS.map((coin) => {
    const current = prices[coin.symbol] || 0;
    const prev = previous[coin.symbol] || current;
    const change = prev ? ((current - prev) / prev) * 100 : 0;

    return {
      ...coin,
      change,
      price: current,
    };
  });

  const orderBook = useMemo(() => {
    const base = prices[selected] || 0;

    return Array.from({ length: 14 }, (_, i) => ({
      bid: +(base - (14 - i) * (base * 0.0004)).toFixed(2),
      ask: +(base + (i + 1) * (base * 0.0004)).toFixed(2),
      bidSize: +(Math.random() * 5).toFixed(4),
      askSize: +(Math.random() * 5).toFixed(4),
    })).reverse();
  }, [prices, selected]);

  const formatPrice = (value?: number) => {
    if (!value) return "Loading...";
    return `$${value.toLocaleString(undefined, {
      maximumFractionDigits: value > 100 ? 2 : 6,
    })}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Binance Terminal
          </h1>
          <p className="text-slate-400 mt-1">
            Real-time cryptocurrency market dashboard
          </p>
        </div>

        <div
          className={`px-5 py-2 rounded-2xl font-bold border ${
            connected
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {connected ? "● LIVE MARKET" : "● DISCONNECTED"}
        </div>
      </div>

      {/* TOP COINS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {COINS.map((coin) => {
          const Icon = coin.icon;
          const price = prices[coin.symbol];
          const prev = previous[coin.symbol] || price || 0;
          const up = price && price >= prev;

          return (
            <motion.button
              key={coin.symbol}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(coin.symbol)}
              className={`relative overflow-hidden rounded-3xl p-5 text-left border transition-all ${
                selected === coin.symbol
                  ? "border-cyan-400 bg-[#121A29]"
                  : "border-slate-800 bg-[#0F1624]"
              } ${
                flashRef.current[coin.symbol] === "up"
                  ? "ring-2 ring-emerald-400"
                  : flashRef.current[coin.symbol] === "down"
                  ? "ring-2 ring-red-400"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${coin.color}20`,
                    color: coin.color,
                  }}
                >
                  <Icon />
                </div>

                <span
                  className={`text-sm font-bold ${
                    up ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {up ? "▲" : "▼"}
                </span>
              </div>

              <h3 className="text-slate-400 text-sm">{coin.name}</h3>
              <p className="text-3xl font-black mt-1">
                {formatPrice(price)}
              </p>

              <div className="h-16 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={(history[coin.symbol] || []).map((p, i) => ({
                      i,
                      p,
                    }))}
                  >
                    <Area
                      type="monotone"
                      dataKey="p"
                      stroke={coin.color}
                      fill={coin.color}
                      fillOpacity={0.18}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* MAIN TERMINAL */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* CHART */}
        <div className="xl:col-span-7 rounded-3xl bg-[#0F1624] border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{selected}/USDT</h2>
              <p className="text-slate-400">
                Live TradingView-style Chart
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black">
                {formatPrice(prices[selected])}
              </p>
            </div>
          </div>

          <div className="h-[460px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedHistory}>
                <XAxis
                  dataKey="time"
                  stroke="#64748B"
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748B"
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#00C2FF"
                  fill="#00C2FF"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER BOOK */}
        <div className="xl:col-span-5 rounded-3xl bg-[#0F1624] border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-6">
            Order Book
          </h2>

          <div className="grid grid-cols-4 text-xs text-slate-500 mb-3">
            <span>Bid</span>
            <span>Size</span>
            <span>Ask</span>
            <span>Size</span>
          </div>

          <div className="space-y-1 max-h-[470px] overflow-y-auto">
            {orderBook.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 text-sm font-mono"
              >
                <span className="text-emerald-400">
                  {row.bid}
                </span>
                <span className="text-slate-300">
                  {row.bidSize}
                </span>
                <span className="text-red-400">
                  {row.ask}
                </span>
                <span className="text-slate-300">
                  {row.askSize}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE TRADES */}
        <div className="xl:col-span-6 rounded-3xl bg-[#0F1624] border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-6">
            Live Trades
          </h2>

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            <AnimatePresence>
              {trades.map((trade) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-4 text-sm font-mono"
                >
                  <span>{trade.symbol}</span>
                  <span
                    className={
                      trade.side === "BUY"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
                    {trade.price}
                  </span>
                  <span>{trade.qty}</span>
                  <span className="text-slate-500">
                    {trade.time}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* MARKET HEATMAP */}
        <div className="xl:col-span-6 rounded-3xl bg-[#0F1624] border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-6">
            Market Heatmap
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {heatmap.map((coin) => (
              <div
                key={coin.symbol}
                className={`rounded-2xl p-5 border ${
                  coin.change >= 0
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <h3 className="font-bold text-lg">
                  {coin.symbol}
                </h3>

                <p className="text-2xl font-black mt-2">
                  {formatPrice(coin.price)}
                </p>

                <p
                  className={`mt-2 font-semibold ${
                    coin.change >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.change >= 0 ? "+" : ""}
                  {coin.change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>

          <div className="h-48 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatmap}>
                <XAxis dataKey="symbol" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="change" fill="#00C2FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingCoins;