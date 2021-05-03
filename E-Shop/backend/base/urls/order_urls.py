from django.urls import path
from base.views import order_view as views


urlpatterns = [
     path('', views.getOrders, name='getOrders'),
     path('add/', views.addOrderItems, name='orders-add'),
     path('myorders/', views.getMyOrders, name='myorders'),
     path('<str:pk>/', views.getOrderByID, name='user-order'),
     path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
     path('<str:pk>/deliver/', views.updateOrderToDelivered, name='deliver'),
]