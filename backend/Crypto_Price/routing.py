from django.urls import re_path
from .consumers import CryptoConsumer

websocket_urlpatterns = [
    re_path(r"ws/crypto/?$", CryptoConsumer.as_asgi()),
]