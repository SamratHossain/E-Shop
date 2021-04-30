from django.urls import path
from base.views import user_view as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('', views.getUser, name="getUser"),
    path('delete/<str:pk>', views.deleteUser, name="deleteUser"),
    path('profile/', views.getUserProfile, name="getProfile"),
    path('profile/update/', views.updateUserProfile, name="updateUserProfile"),
    path('register/', views.userRegister, name="userRegister"),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
]