from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from users.models import CustomUser
from users.serializers import UserRegistrationSerializer
from users.permissions import IsOwnerOrReadOnly


class UsersAPI(generics.ListCreateAPIView):
    """
    This view provides 'list' for all users and 'create' new users.
    """
    serializer_class = UserRegistrationSerializer
    queryset = CustomUser.objects.all()


class UsersDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    This view provides 'retrieve', 'update', 'destroy' actions to appropriate users.
    """
    serializer_class = UserRegistrationSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

