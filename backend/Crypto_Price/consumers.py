import json
from channels.generic.websocket import AsyncWebsocketConsumer


class CryptoConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

        await self.channel_layer.group_add(
            "crypto_prices",
            self.channel_name
        )

        await self.send(text_data=json.dumps({
            "prices": {}
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "crypto_prices",
            self.channel_name
        )

    async def crypto_update(self, event):
        await self.send(text_data=json.dumps({
            "prices": event["data"]
        }))