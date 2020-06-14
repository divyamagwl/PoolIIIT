from rest_framework import serializers
from rest_framework.reverse import reverse
from django.http import HttpResponseRedirect
from pool.models import Booking

class BookingSerializer (serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    booking_url = serializers.SerializerMethodField('make_booking_url')
    user_url = serializers.SerializerMethodField('make_user_url')

    class Meta:
        model = Booking
        fields = ['id', 'booking_url', 'date', 'time', 'location', 'user', 'user_url']

    #Build URL for Booking instance
    def make_booking_url(self, obj):
        kwargs = {'pk': obj.id}
        url = reverse('booking-detail', kwargs=kwargs)
        return self.context['request'].build_absolute_uri(url)

    #Build URL for User instance
    def make_user_url(self, obj):
        kwargs = {'username': obj.user.username}
        url = reverse('user-detail', kwargs=kwargs)
        return self.context['request'].build_absolute_uri(url)
