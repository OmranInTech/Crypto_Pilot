from django.apps import AppConfig
import threading
import os


class CryptoPriceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Crypto_Price'

    def ready(self):
        # Prevent duplicate execution in dev server
        if os.environ.get("RUN_MAIN") != "true":
            return

        try:
            from .binance_ws import binance_stream

            thread = threading.Thread(
                target=binance_stream,
                daemon=True
            )
            thread.start()

        except Exception as e:
            print("❌ Binance thread failed:", e)