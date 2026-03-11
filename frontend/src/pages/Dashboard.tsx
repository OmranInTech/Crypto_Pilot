import { FaBitcoin, FaRocket } from "react-icons/fa";
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

function Dashboard() {
  // Sample crypto chart data (improved look)
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "BTC Price ($)",
        data: [32000, 35000, 33000, 38000, 40000, 42000, 45000],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        grid: { drawBorder: false, color: "#e5e7eb" },
        ticks: { color: "#111827", font: { weight: "500" } },
      },
      x: {
        grid: { drawBorder: false, color: "#e5e7eb" },
        ticks: { color: "#111827", font: { weight: "500" } },
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
        {/* Left text */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <FaBitcoin className="text-yellow-500 text-5xl" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Crypto Pilot
            </h1>
          </div>

          <p className="text-lg md:text-xl max-w-xl leading-relaxed">
            Welcome to <span className="font-semibold">Crypto Pilot</span> — your ultimate trading dashboard with smart bots guiding you to make profitable crypto trades. Become rich with us, or stay one step behind in your dream life!
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition transform hover:scale-105">
              Start Now
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 flex items-center gap-2">
              Learn More <FaRocket />
            </button>
          </div>
        </div>

        {/* Right chart */}
        <div className="flex-1 w-full max-w-md md:max-w-lg p-6 bg-gray-50 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">BTC Price Overview</h2>
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Bottom CTA section */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Step into your crypto future!
        </h2>
        <p className="text-gray-600">
          Track, trade, and grow your portfolio with smart bots guiding your journey.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;