from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
		path('', views.index, name='index'),
		path('login', views.login, name='login'),
		path('TryLogin', views.TryLogin, name='TryLogin'),
		path('Welcome', views.Welcome, name='Welcome'),
]