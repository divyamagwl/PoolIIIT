from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from datetime import datetime
from pool.models import Booking
from pool.serializers import BookingSerializer
from pool.permissions import IsOwnerOrReadOnly

class BookingListAPI(generics.ListCreateAPIView):
    """
    This view provides 'list' of all bookings and 'create' new bookings.
    """
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    This view provides 'retrieve', 'update', 'destroy' actions for the bookings to appropriate users.
    """
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingFilteredListAPI(generics.ListAPIView):
    """
    This view provides 'list' of all bookings which overlap with the current booking id
    """
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    #This function filters the overlapping bookings
    def get_queryset(self):
        id = str(self.kwargs['pk']) #id is extracted from the url
        obj = Booking.objects.filter(id=id).first()
        #Converting to datetime object
        start = datetime.combine(obj.date, obj.flexibility_before)
        end = datetime.combine(obj.date, obj.flexibility_after)

        query_list = []
        for curr_obj in Booking.objects.all().exclude(user=obj.user):

            #Converting to datetime object
            curr_obj_start = datetime.combine(curr_obj.date, curr_obj.flexibility_before)
            curr_obj_end = datetime.combine(curr_obj.date, curr_obj.flexibility_after)

            #Conditions to satisfy overalapping
            if curr_obj_start >= start and curr_obj_end <= end:
                query_list.append(curr_obj)
            elif curr_obj_start <= end and curr_obj_end >= end:
                query_list.append(curr_obj)
            elif curr_obj_end >= start and curr_obj_start <= start:
                query_list.append(curr_obj)

        return query_list