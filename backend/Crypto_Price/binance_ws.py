import asyncio
import json
import websockets
from channels.layers import get_channel_layer

BINANCE_URL = (
    "wss://stream.binance.com:9443/stream?streams="
    "btcusdt@trade/ethusdt@trade/dogeusdt@trade/solusdt@trade"
)

async def binance_stream():
    print("🚀 Binance Live Stream Started")

    channel_layer = get_channel_layer()

    async with websockets.connect(BINANCE_URL) as ws:

        while True:
            msg = await ws.recv()
            data = json.loads(msg)

            payload = data["data"]

            symbol = payload["s"].replace("USDT", "")
            price = float(payload["p"])

            update = {
                symbol: price
            }

            await channel_layer.group_send(
                "crypto_prices",
                {
                    "type": "crypto_update",
                    "data": update
                }
            )

            print("📡 LIVE:", update)