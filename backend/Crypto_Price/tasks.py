from celery import shared_task
import requests
from django.core.cache import cache

@shared_task
def update_crypto_prices():
    try:
        url = "https://api.coingecko.com/api/v3/simple/price"

        params = {
            "ids": "bitcoin,ethereum,dogecoin,solana",
            "vs_currencies": "usd"
        }

        response = requests.get(url, params=params)
        data = response.json()

        result = {
            "BTC": data.get("bitcoin", {}).get("usd"),
            "ETH": data.get("ethereum", {}).get("usd"),
            "DOGE": data.get("dogecoin", {}).get("usd"),
            "SOL": data.get("solana", {}).get("usd"),
        }

        print("DEBUG RESULT:", result)  # 👈 important

        cache.set("crypto_prices", result, 60)

        return result

    except Exception as e:
        print("ERROR:", str(e))
        return None