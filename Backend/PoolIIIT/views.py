from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'booking': reverse('booking-list', request=request, format=format),
    })