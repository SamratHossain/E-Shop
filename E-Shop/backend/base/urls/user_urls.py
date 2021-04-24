from django.urls import path
from base.views import user_view as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('', views.getUser, name="getUser"),
    path('profile/', views.getUserProfile, name="getProfile"),
    path('register/', views.userRegister, name="userRegister"),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
]