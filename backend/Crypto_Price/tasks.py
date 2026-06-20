import requests
import logging
from celery import shared_task
from django.core.cache import cache
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

logger = logging.getLogger(__name__)


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

    fallback = {
        "BTC": None,
        "ETH": None,
        "DOGE": None,
        "SOL": None,
        "status": "API unavailable"
    }

    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()

        data = response.json()

        if not isinstance(data, list):
            logger.warning("Invalid API response: %s", data)
            return fallback

        prices = {"BTC": None, "ETH": None, "DOGE": None, "SOL": None}

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

    except requests.exceptions.RequestException as e:
        logger.error("CoinGecko API error: %s", e)
        return fallback


# =========================
# CELERY TASK
# =========================
@shared_task
def update_crypto_prices():

    prices = fetch_prices()

    cache.set("crypto_prices", prices, timeout=10)

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "crypto_prices",
        {
            "type": "crypto_update",
            "data": prices
        }
    )

    logger.info("Sent to frontend: %s", prices)

    return prices