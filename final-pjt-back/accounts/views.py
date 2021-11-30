from rest_framework import serializers, status
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from forum.serializers import ReviewSerializer
from .models import User
from forum.models import Review

from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

import json




@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    password = request.data.get('password')
    passwordConfirm = request.data.get('passwordConfirm')

    if password != passwordConfirm:
        return Response({''}, status = status.status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)








@api_view(['POST'])
@permission_classes([AllowAny])
def leave(request):
    user = User.objects.get(username=request.user)
    user.delete()
    return Response({ 'status': 'deleted' }, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([AllowAny])
def profile(request):
    user = User.objects.all()
    data = user.values('pk', 'username', 'is_superuser')
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def profile_info(request, username):
    user = User.objects.get(username=username)
    
    reviews = Review.objects.filter(user=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)