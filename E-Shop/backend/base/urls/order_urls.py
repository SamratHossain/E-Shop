from django.urls import path
from base.views import order_view as views


urlpatterns = [
     path('add/', views.addOrderItems, name='orders-add'),
]