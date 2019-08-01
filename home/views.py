from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path

from . import views
from .models import SDO_Users

def index(request):
	return HttpResponse("Hello, world. You're at the polls index.")

def login(request):
	return render(request,"login.html",
		{
			'Title' : 'Login | Special Days Online',
		}
	)

def TryLogin(request):
	if request.method == 'POST':
		data = request.POST.copy()
		UserCode = data.get('UserCode', 'Error') 
		UserPass = data.get('UserPass', 'Error')
	else:
		return HttpResponse('Error: Post.')
	SDO_Users.objects.all()
	try:
		UserDetail = SDO_Users.objects.get(Code=UserCode)
		if(UserDetail.Password == UserPass):
			result = 'Correcto'
		else:
			result = 'Contraseña equivocada'
	except:
		result = "No existe el usuario"
	return HttpResponse(result) 

def Welcome(request):
	return render(request,"welcome.html",
		{
			'Title' : 'Welcome | Special Days Online',
		}
	)
