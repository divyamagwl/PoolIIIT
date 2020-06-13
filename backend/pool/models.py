from django.db import models
from users.models import CustomUser

class Booking(models.Model):
    date = models.DateField()
    time = models.TimeField(help_text="hh:mm am/pm")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user')
    booking_url = models.URLField(max_length=200, default="", blank=True)
    user_url = models.URLField(max_length=200, default="", blank=True)