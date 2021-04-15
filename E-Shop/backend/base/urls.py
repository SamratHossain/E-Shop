from django.urls import path
from base import views

urlpatterns = [
    path('', views.getRoute, name="getRoute"),
    path('product/', views.getProducts, name="getProduct"),
    path('product/<str:pk>', views.getProduct, name="getProduct"),
]