import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache

class CryptoConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("crypto_prices", self.channel_name)

        data = cache.get("crypto_prices") or {}
        await self.send(text_data=json.dumps({
            "prices": data
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("crypto_prices", self.channel_name)

    async def receive(self, text_data):
        # Send latest cached prices
        data = cache.get("crypto_prices") or {}
        await self.send(text_data=json.dumps({
            "prices": data
        }))

    async def crypto_update(self, event):
        await self.send(text_data=json.dumps({
            "prices": event.get("data", {})
        }))