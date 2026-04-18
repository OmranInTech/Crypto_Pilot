from django.urls import path
from .views import CryptoPriceAPIView

urlpatterns = [
    path("prices/", CryptoPriceAPIView.as_view()),
]