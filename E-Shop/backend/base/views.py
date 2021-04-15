from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

# Create your views here.

@api_view(['GET'])
def getRoute(request):
    route = [
        'api/product',
        'api/product/create',
        'api/product/update',
        'api/product/delete'
    ]
    return Response(route)

@api_view(['GET'])
def getProducts(request):
   
    return Response(products)

@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for i in products:
       if i['_id'] == pk:
        product = i
    return Response(product)
