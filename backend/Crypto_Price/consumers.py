import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache


class CryptoConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # Join group
        await self.channel_layer.group_add(
            "crypto_prices",
            self.channel_name
        )

        await self.accept()

        # =========================
        # 🔥 DEBUG ADDED HERE
        # =========================
        data = cache.get("crypto_prices")

        print("🔥 CACHE DATA:", data)

        # Fallback if cache is empty
        if not data:
            data = {
                "BTC": 0,
                "ETH": 0,
                "DOGE": 0,
                "SOL": 0
            }

        print("📤 SENDING TO FRONTEND:", data)
        # =========================

        await self.send(text_data=json.dumps({
            "prices": data
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "crypto_prices",
            self.channel_name
        )

    async def receive(self, text_data):
        data = cache.get("crypto_prices")

        if not data:
            data = {
                "BTC": 0,
                "ETH": 0,
                "DOGE": 0,
                "SOL": 0
            }

        await self.send(text_data=json.dumps({
            "prices": data
        }))

    async def crypto_update(self, event):
        data = event.get("data", {})

        print("📡 GROUP UPDATE RECEIVED:", data)  # 🔥 extra debug

        await self.send(text_data=json.dumps({
            "prices": data
        }))