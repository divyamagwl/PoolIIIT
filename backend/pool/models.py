from django.db import models
from users.models import CustomUser

LOCATIONS = (
    ('KIA', 'Kempegowda International Airport'),
    ('MBS', 'Majestic Bus Station'),
    ('KSR', 'Bangalore City Railway Station (Krantivira Sangolli Rayanna Railway Station)'),
    ('BCR', 'Bangalore Cantonment Railway Station'),
    ('YJR', 'Yeshwanthpur Junction Railway Station'),
    ('KPR', 'KR Puram Railway Station'),
    ('BMR', 'Baiyapanahalli Metro Station (Purple)'),
    ('MRM', 'Mysore Road Metro Station (Purple)'),
    ('NMS', 'Nagasandra Metro Station (Green)'),
    ('YMS', 'Yelanchenahalli Metro Station (Green)'),
    ('MMS', 'Majestic Metro Station (Green<->Purple)'),
)

class Booking(models.Model):
    date = models.DateField()
    time = models.TimeField(help_text="hh:mm am/pm")
    location = models.CharField(max_length=3, choices=LOCATIONS, default="KIA")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user')
    booking_url = models.URLField(max_length=200, default="", blank=True)
    user_url = models.URLField(max_length=200, default="", blank=True)