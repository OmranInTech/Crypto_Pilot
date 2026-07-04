from django.urls import path
from .views import CryptoPriceAPIView

from .views_secure_demo import (
    crypto_prices_vulnerable,
    crypto_prices_secure
)

#ddos simulation
from .views_ddos_demo import CryptoPriceDDOSDemo




urlpatterns = [
    path("prices/", CryptoPriceAPIView.as_view()),
     path("vuln/", crypto_prices_vulnerable),
    path("secure/", crypto_prices_secure),

    path("ddos/", CryptoPriceDDOSDemo.as_view()),
    

]