from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from users.models import CustomUser
from users.serializers import UserRegistrationSerializer, UserUpdateSerializer, UpdatePasswordSerializer
from users.permissions import IsOwnerOrReadOnly


class UsersAPI(generics.ListCreateAPIView):
    """
    This view provides 'list' for all users and 'create' new users.
    """
    serializer_class = UserRegistrationSerializer
    queryset = CustomUser.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                details = serializer.data
                details['token'] = token.key
                return Response(details, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    This view provides 'retrieve', 'update', 'destroy' actions to appropriate users.
    """
    serializer_class = UserUpdateSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    lookup_field = 'username'


class UpdatePassword(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = UpdatePasswordSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    lookup_field = 'username'

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = UpdatePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            current_password = serializer.data.get("current_password")
            if not self.object.check_password(current_password):
                return Response({"current_password": ["Wrong password."]}, 
                                status=status.HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)