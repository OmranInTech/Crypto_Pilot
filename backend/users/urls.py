from django.urls import path
from .views import RegisterView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView # Import this

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    # Add this so your React app can swap an old token for a new one
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]