from django.apps import AppConfig
import threading


class CryptoPriceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Crypto_Price'

    def ready(self):
        # Prevent duplicate threads (IMPORTANT FIX)
        import os

        if os.environ.get("RUN_MAIN") != "true":
            return

        from .binance_runner import start_binance_stream

        thread = threading.Thread(
            target=start_binance_stream,
            daemon=True
        )
        thread.start()