from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.api_root, name='home'), #Home page of API root
    path('', include('users.urls')),
    path('', include('pool.urls')),
    path('', include('rest_framework.urls')) #Provides login/logout functionality for browsable api
]
