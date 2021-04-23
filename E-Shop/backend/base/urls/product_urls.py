from django.urls import path
from base.views import product_view as views


urlpatterns = [
    path('', views.getProducts, name="getProduct"),
    path('<str:pk>/', views.getProduct, name="getProduct"),
]