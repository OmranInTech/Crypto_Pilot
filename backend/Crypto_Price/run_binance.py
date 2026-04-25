import asyncio
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from Crypto_Price.binance_ws import binance_stream


def start_binance_stream():
    print("🚀 Starting Binance Stream...")
    asyncio.run(binance_stream())


if __name__ == "__main__":
    start_binance_stream()