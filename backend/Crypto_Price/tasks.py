import random
from celery import shared_task
from django.core.cache import cache
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


@shared_task
def update_crypto_prices():
    data = {
        "BTC": round(random.uniform(40000, 50000), 2),
        "ETH": round(random.uniform(3000, 3500), 2),
        "DOGE": round(random.uniform(0.10, 0.25), 4),
        "SOL": round(random.uniform(120, 160), 2),
    }

    # 1. Save in cache
    cache.set("crypto_prices", data, timeout=10)

    # 2. Send to WebSocket group
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "crypto_prices",
        {
            "type": "crypto_update",
            "data": data
        }
    )

    return data