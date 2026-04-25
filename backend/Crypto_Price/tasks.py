import requests
from celery import shared_task
from django.core.cache import cache
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


# =========================
# FETCH COINGECKO PRICES (SAFE)
# =========================
def fetch_prices():
    url = "https://api.coingecko.com/api/v3/coins/markets"

    params = {
        "vs_currency": "usd",
        "ids": "bitcoin,ethereum,dogecoin,solana",
        "order": "market_cap_desc",
        "per_page": 4,
        "page": 1,
        "sparkline": "false"
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        # =========================
        # RATE LIMIT / ERROR CHECK
        # =========================
        if isinstance(data, dict) and data.get("status"):
            print("❌ API ERROR:", data)
            return {
                "BTC": 0,
                "ETH": 0,
                "DOGE": 0,
                "SOL": 0,
            }

        if not isinstance(data, list):
            print("❌ Invalid response:", data)
            return {
                "BTC": 0,
                "ETH": 0,
                "DOGE": 0,
                "SOL": 0,
            }

        prices = {
            "BTC": 0,
            "ETH": 0,
            "DOGE": 0,
            "SOL": 0,
        }

        for coin in data:
            if not isinstance(coin, dict):
                continue

            coin_id = coin.get("id")
            price = coin.get("current_price")

            if coin_id == "bitcoin":
                prices["BTC"] = price
            elif coin_id == "ethereum":
                prices["ETH"] = price
            elif coin_id == "dogecoin":
                prices["DOGE"] = price
            elif coin_id == "solana":
                prices["SOL"] = price

        return prices

    except Exception as e:
        print("❌ FETCH ERROR:", e)
        return {
            "BTC": 0,
            "ETH": 0,
            "DOGE": 0,
            "SOL": 0,
        }


# =========================
# CELERY TASK
# =========================
@shared_task
def update_crypto_prices():

    prices = fetch_prices()

    # Save cache
    cache.set("crypto_prices", prices, timeout=10)

    # Send to WebSocket
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "crypto_prices",
        {
            "type": "crypto_update",
            "data": prices
        }
    )

    print("🚀 SENT TO FRONTEND:", prices)

    return prices