from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
	path('', views.login, name='login'),
	path('login', views.login, name='login'),
	path('SessionOFF', views.SessionOFF, name='SessionOFF'),
	path('TryLogin', views.TryLogin, name='TryLogin'),
	path('Welcome', views.Welcome, name='Welcome'),
	path('teststoredprocedure', views.teststoredprocedure, name='teststoredprocedure'),
    path('process-payment', views.process_payment, name='process_payment'),
    path('payment-done', views.payment_done, name='payment_done'),
    path('payment-cancelled', views.payment_canceled, name='payment_cancelled'),
]