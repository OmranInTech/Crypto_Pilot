from rest_framework.response import Response
from rest_framework.views import APIView
from .services.crypto_service import get_crypto_prices

class CryptoPriceAPIView(APIView):
    def get(self,request):
        prices= get_crypto_prices()

        return Response(
            {
                "success": True,
                "data": prices
            }
        )