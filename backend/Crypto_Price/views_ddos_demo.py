from rest_framework.views import APIView
from rest_framework.response import Response
from .services.crypto_service import get_crypto_prices
from .throttling import BurstRateThrottle, BurstAnonRateThrottle
import time


class CryptoPriceDDOSDemo(APIView):
    throttle_classes = [BurstRateThrottle, BurstAnonRateThrottle]

    def get(self, request):
        # simulate slow backend
        time.sleep(1)

        prices = get_crypto_prices()

        return Response({
            "success": True,
            "data": prices
        })