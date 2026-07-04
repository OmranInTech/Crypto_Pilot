from django.contrib import admin
from django.urls import path, include

#attack simulation to show jwt tokens 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/crypto/", include("Crypto_Price.urls")),

    #attack simulation to show jwt tokens
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),

    
]