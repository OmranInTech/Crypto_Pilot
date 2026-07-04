# from rest_framework.views import APIView
# from rest_framework.response import Response
# import time

# from .services.crypto_service import get_crypto_prices
# from .throttling import NoLimitUserThrottle, NoLimitAnonThrottle


# class CryptoPriceAPIView(APIView):
#     """
#     BEFORE PROTECTION:
#     - No real rate limiting
#     - System is vulnerable under load
#     """

#     throttle_classes = [NoLimitUserThrottle, NoLimitAnonThrottle]

#     def get(self, request):
#         time.sleep(1)  # simulate slow external API

#         data = get_crypto_prices()

#         return Response({
#             "mode": "baseline",
#             "status": "vulnerable",
#             "data": data
#         })



from rest_framework.views import APIView
from rest_framework.response import Response
import time

from .services.crypto_service import get_crypto_prices
from .throttling import BurstRateThrottle, BurstAnonRateThrottle


class CryptoPriceAPIView(APIView):
    """
    AFTER PROTECTION:
    - Rate limiting enabled
    - Protects API from request flooding
    """

    throttle_classes = [BurstRateThrottle, BurstAnonRateThrottle]

    def get(self, request):
        time.sleep(1)  # simulate external API delay

        data = get_crypto_prices()

        return Response({
            "mode": "protected",
            "status": "rate limited",
            "data": data
        })