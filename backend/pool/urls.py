from django.urls import path, include, re_path
from rest_framework import routers
from . import views


urlpatterns = [
    path("booking/", views.BookingListAPI.as_view(), name='booking-list'),
    path("booking/details/<int:pk>/", views.BookingDetailAPI.as_view(), name='booking-detail'),
    path("booking/<int:pk>/", views.BookingFilteredListAPI.as_view(), name='filtered-list'),
    path("users/<username>/booking/", views.UserBookingListAPI.as_view(), name='users-booking'),
]
