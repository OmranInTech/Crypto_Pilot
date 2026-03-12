import { useState, useEffect } from "react";
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

function BotHelper() {
  const coins = ["BTC", "ETH", "SOL", "DOGE", "BNB", "ADA"];
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [priceData, setPriceData] = useState([45000, 45200, 45100, 45300, 45500, 45400, 45600]);
  const [signal, setSignal] = useState(""); // Buy / Sell / Hold
  const [portfolio, setPortfolio] = useState({ BTC: 0, USD: 10000 });

  // Simulate live coin price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => {
        const last = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 200;
        const next = Math.max(0, last + change);
        return [...prev.slice(-19), next];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  // Simple signal generator
  useEffect(() => {
    const lastPrice = priceData[priceData.length - 1];
    const prevPrice = priceData[priceData.length - 2] || lastPrice;
    if (lastPrice > prevPrice * 1.01) setSignal("SELL");
    else if (lastPrice < prevPrice * 0.99) setSignal("BUY");
    else setSignal("HOLD");
  }, [priceData]);

  const handleBuy = () => {
    const lastPrice = priceData[priceData.length - 1];
    const amountToBuy = Math.min(portfolio.USD / lastPrice, 1); // buy 1 coin max
    setPortfolio(prev => ({
      USD: prev.USD - amountToBuy * lastPrice,
      [selectedCoin]: (prev[selectedCoin] || 0) + amountToBuy,
    }));
    alert(`Bought ${amountToBuy.toFixed(4)} ${selectedCoin} at $${lastPrice.toFixed(2)}`);
  };

  const handleSell = () => {
    const lastPrice = priceData[priceData.length - 1];
    const amountToSell = Math.min(portfolio[selectedCoin] || 0, 1);
    setPortfolio(prev => ({
      USD: prev.USD + amountToSell * lastPrice,
      [selectedCoin]: (prev[selectedCoin] || 0) - amountToSell,
    }));
    alert(`Sold ${amountToSell.toFixed(4)} ${selectedCoin} at $${lastPrice.toFixed(2)}`);
  };

  const chartData = {
    labels: priceData.map((_, i) => i + 1),
    datasets: [
      {
        label: `${selectedCoin} Price`,
        data: priceData,
        borderColor: "#4F6EF7",
        backgroundColor: "rgba(79,110,247,0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 300 },
    scales: { y: { grid: { color: "#E5E7EB" } }, x: { grid: { color: "#E5E7EB" } } },
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Bot Helper</h1>

      {/* Coin Selector */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <label className="text-gray-700 font-medium">Select Coin:</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {coins.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 text-center">
          <p className="text-gray-700 font-medium">Signal: <span className={`font-bold ${signal === "BUY" ? "text-green-600" : signal === "SELL" ? "text-red-600" : "text-gray-500"}`}>{signal}</span></p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleBuy} className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition">Buy</button>
          <button onClick={handleSell} className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition">Sell</button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md h-[300px]">
        <Line data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
      </div>

      {/* Portfolio */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md">
        <h2 className="text-md font-semibold mb-2">Portfolio</h2>
        <p>USD: ${portfolio.USD.toFixed(2)}</p>
        {coins.map(c => (
          <p key={c}>{c}: {(portfolio[c] || 0).toFixed(4)}</p>
        ))}
      </div>
    </div>
  );
}

export default BotHelper;