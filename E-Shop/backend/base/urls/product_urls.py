from django.urls import path
from base.views import product_view as views


urlpatterns = [
    path('', views.getProducts, name="getProduct"),
    path('create/', views.createProduct, name="createProduct"),
    path('upload/', views.uploadImage, name="uploadImage"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('<str:pk>/', views.getProduct, name="getProduct"),
    path('delete/<str:pk>/', views.deleteProduct, name="deleteProduct"),
    path('update/<str:pk>/', views.updateProduct, name="updateProduct"),
]