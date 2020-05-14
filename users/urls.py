from django.urls import path, include
from rest_framework import routers
from . import views


urlpatterns = [
    path("register/", views.UsersAPI.as_view(), name='user-list'),
    path("users/<int:pk>/", views.UsersDetailAPI.as_view(), name='user-detail'),
]
