from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """
    User model with extra information while Django still handles the authentication process
    """
    first_name = models.CharField(blank=False, max_length=50, verbose_name='first name')
    last_name = models.CharField(blank=True, max_length=150, verbose_name='last name')
    email = models.EmailField(blank=False, max_length=254, verbose_name='email address')
    phone = models.CharField(blank=False, max_length=10, verbose_name="phone number")
    url = models.URLField(max_length=200)