import requests
from django.core.cache import cache

CACHE_KEY = "crypto_prices_cache"
CACHE_TIMEOUT = 10  # seconds (important for "real-time feel")

def get_crypto_prices():
    # 1. check cache first
    cached_data = cache.get(CACHE_KEY)
    if cached_data:
        return cached_data

    # 2. fetch from API if no cache
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

    # 3. store in cache
    cache.set(CACHE_KEY, result, CACHE_TIMEOUT)

    return result