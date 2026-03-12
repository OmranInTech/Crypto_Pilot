import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FaBitcoin, FaEthereum, FaDog, FaRocket } from "react-icons/fa";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

function AutoTrader() {
  const coins = ["BTC", "ETH", "SOL", "DOGE", "BNB", "ADA", "XRP", "LTC", "DOT", "UNI", "LINK", "AVAX", "MATIC", "ATOM", "TRX", "EOS", "FTM", "ALGO", "VET", "ICP"];
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [investment, setInvestment] = useState(1000);
  const [botActive, setBotActive] = useState(false);
  const [priceData, setPriceData] = useState([45000, 45200, 45100, 45300, 45500, 45400, 45600]);
  const [volumeData, setVolumeData] = useState([100, 120, 80, 140, 130, 150, 160]);
  const [rsiData, setRsiData] = useState([50, 55, 52, 60, 58, 62, 61]);
  const [macdData, setMacdData] = useState([0, 50, 20, -10, 30, 10, 40]);
  const [portfolio, setPortfolio] = useState(0);

  useEffect(() => {
    if (!botActive) return;
    const interval = setInterval(() => {
      setPriceData(prev => {
        const last = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 200;
        const next = Math.max(0, last + change);
        return [...prev.slice(-19), next];
      });
      setVolumeData(prev => [...prev.slice(-19), Math.floor(Math.random() * 200)]);
      setRsiData(prev => [...prev.slice(-19), Math.floor(30 + Math.random() * 40)]);
      setMacdData(prev => [...prev.slice(-19), Math.floor(Math.random() * 50 - 25)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [botActive]);

  const startBot = () => {
    setBotActive(true);
    setPortfolio(investment / priceData[priceData.length - 1]);
  };

  const lineChartData = {
    labels: priceData.map((_, i) => i + 1),
    datasets: [
      { label: "Price", data: priceData, borderColor: "#4F6EF7", backgroundColor: "rgba(79,110,247,0.1)", tension: 0.3, fill: true },
      { label: "MACD", data: macdData, borderColor: "#F59E0B", backgroundColor: "transparent", tension: 0.3, fill: false },
      { label: "RSI", data: rsiData, borderColor: "#10B981", backgroundColor: "transparent", tension: 0.3, fill: false },
    ],
  };

  const volumeChartData = {
    labels: volumeData.map((_, i) => i + 1),
    datasets: [{ label: "Volume", data: volumeData, backgroundColor: "#9333EA" }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    animation: { duration: 300 },
    scales: { y: { grid: { color: "#E5E7EB" } }, x: { grid: { color: "#E5E7EB" } } },
  };

  const hotCoins = coins.map(c => ({
    name: c,
    change: ((Math.random() - 0.5) * 20).toFixed(2),
  }));

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6 space-y-6">

      <h1 className="text-2xl font-bold text-gray-800 animate-slideUp">Auto Trader</h1>

      {/* Bot Setup */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideUp">
        <div>
          <label className="text-gray-700 font-medium">Select Coin:</label>
          <select value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)} className="w-full p-2 border rounded-lg">
            {coins.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className="text-gray-700 font-medium">Investment Amount ($):</label>
          <input type="number" value={investment} onChange={e => setInvestment(parseFloat(e.target.value))} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="flex items-end">
          <button onClick={startBot} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Start Auto Trader</button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp h-[250px]">
          <h2 className="text-md font-semibold mb-2">{selectedCoin} Candlestick Chart</h2>
          <Line data={lineChartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp h-[250px]">
          <h2 className="text-md font-semibold mb-2">Volume</h2>
          <Bar data={volumeChartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Hot Coins Heatmap */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition animate-slideUp">
        <h2 className="text-md font-semibold mb-2">Hot Coins</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 text-sm overflow-x-auto">
          {hotCoins.map((coin, idx) => (
            <div key={idx} className={`p-2 rounded-lg text-center ${coin.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {coin.name} <br /> {coin.change}%
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp { 0% { opacity:0; transform: translateY(20px);} 100%{opacity:1; transform:translateY(0);} }
        .animate-slideUp { animation: slideUp 0.6s ease forwards; }
      `}</style>
    </div>
  );
}

export default AutoTrader;