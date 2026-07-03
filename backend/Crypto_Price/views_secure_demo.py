from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Crypto_Price.tasks import fetch_prices
from config.settings import SECURE_MODE




#  VULNERABLE VERSION

@api_view(["GET"])
def crypto_prices_vulnerable(request):
    return Response({
        "mode": "vulnerable",
        "data": fetch_prices()
    })



# SECURE VERSION

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def crypto_prices_secure(request):
    return Response({
        "mode": "secure",
        "data": fetch_prices()
    })