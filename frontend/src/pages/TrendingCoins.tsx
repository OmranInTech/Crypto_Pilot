import { useEffect, useState } from "react";
import { FaBitcoin, FaEthereum, FaDog, FaRocket } from "react-icons/fa";
import { createCryptoSocket } from "../services/websocket"; // ✅ IMPORTANT PATH FIX

function TrendingCoins() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const cleanup = createCryptoSocket(
      (data) => {
        console.log("📦 received prices:", data);
        setPrices(data);
      },
      (status) => setConnected(status)
    );

    return cleanup;
  }, []);

  const formatPrice = (value?: number) => {
    if (value === undefined || value === null || value === 0) {
      return "Loading...";
    }
    return `$${Number(value).toLocaleString()}`;
  };

  const coins = [
    { symbol: "BTC", name: "Bitcoin", icon: <FaBitcoin /> },
    { symbol: "ETH", name: "Ethereum", icon: <FaEthereum /> },
    { symbol: "DOGE", name: "Dogecoin", icon: <FaDog /> },
    { symbol: "SOL", name: "Solana", icon: <FaRocket /> },
  ];

  return (
    <div className="p-6">
      <h1>Trending Coins</h1>

      <p className={connected ? "text-green-500" : "text-red-500"}>
        {connected ? "Live Connected 🚀" : "Disconnected ❌"}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {coins.map((coin) => {
          const price = prices?.[coin.symbol];

          return (
            <div key={coin.symbol} className="border p-4 rounded">
              <div className="flex items-center gap-2">
                {coin.icon}
                <h2>{coin.name}</h2>
              </div>

              <p className="text-lg font-bold">
                {formatPrice(price)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingCoins;