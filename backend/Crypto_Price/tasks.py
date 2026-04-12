from celery import shared_task
from django.core.cache import cache
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import requests


@shared_task
def update_crypto_prices():

    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": "bitcoin,ethereum,dogecoin,solana",
        "vs_currencies": "usd"
    }

    response = requests.get(url, params=params)
    data = response.json()

    prices = {
        "BTC": data["bitcoin"]["usd"],
        "ETH": data["ethereum"]["usd"],
        "DOGE": data["dogecoin"]["usd"],
        "SOL": data["solana"]["usd"],
    }

    # 1. Save to Redis cache
    cache.set("crypto_prices", prices, timeout=30)

    # 2. Send to WebSocket group
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "crypto_prices",
        {
            "type": "crypto_update",
            "data": prices
        }
    )

    return prices