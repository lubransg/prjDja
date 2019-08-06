from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import path, reverse

from . import views
from .models import SDO_Users
from django.db import connection,connections
from collections import namedtuple

from django.conf import settings
from decimal import Decimal
from paypal.standard.forms import PayPalPaymentsForm
from django.views.decorators.csrf import csrf_exempt

def index(request):
	return HttpResponse("Hello, world. You're at the polls index.")

def namedtuplefetchall(cursor):
  desc = cursor.description
  nt_result = namedtuple('Result', [col[0] for col in desc])
  return [nt_result(*row) for row in cursor.fetchall()]

def login(request):
	UserID = request.session.get('UserID')
	if UserID and UserID > 0:
		return redirect('/home/Welcome')
	else:
		return render(request,"login.html",
			{
				'Title' : 'Login | Special Days Online',
				'HideNav' : 'Yes'
			}
		)
  
def TryLogin(request):
	if request.method == 'POST':
		data = request.POST.copy()
		UserCode = data.get('UserCode', 'Error') 
		UserPass = data.get('UserPass', 'Error')
	else:
		return HttpResponse('Error: Post.')
		
	cursor = connection.cursor()
	query = "EXEC {} '{}', '{}'"
	cursor.execute(query.format("SDO_GetUserLog",UserCode, UserPass))
	Result = namedtuplefetchall(cursor)
	result = ''
	if len(Result)>0:
		for obj in Result:
			result = 'Correcto'
			request.session['UserID'] = obj.id
			request.session['UserName'] = obj.Name
			request.session['UserCode'] = obj.Code
			#result = result + 'Name: ' + obj.Name + ' UserCode: ' + obj.Code + '\n'
	else:
		result = "Contraseña y/o usuario incorrecto"
	return HttpResponse(result) 

def Welcome(request):
	UserID = request.session.get('UserID')
	if UserID and UserID > 0:
		UserID = request.session.get('UserID')
		UserName = request.session.get('UserName')
		UserCode = request.session.get('UserCode')
		return render(request,"welcome.html",
			{
				'Title' : 'Welcome | Special Days Online',
				'UserID' : UserID,
				'UserName' : UserName,
				'UserCode' : UserCode
			}
		) 
	else:
		return redirect('/home/login')

def SessionOFF(request):
	request.session.flush()
	return redirect('/home/login')

def teststoredprocedure(request):	
	if request.method == 'POST':
		data = request.POST.copy()
		Text = data.get('TextTest', 'Error') 
	else:
		return HttpResponse('Error: Post.')
	cursor = connection.cursor()
	query = "EXEC {} '{}'"
	cursor.execute(query.format("SDO_GetResponse",Text))
	Result = namedtuplefetchall(cursor)
	result = ''
	for obj in Result:
		result = result + 'Text: ' + obj.TextResult + ' Huerta: ' + obj.Huerta + '\n'
	return HttpResponse(result) 

def process_payment(request):
    host = request.get_host()
 
    paypal_dict = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        # 'amount': '%.2f' % order.total_cost().quantize(
        #     Decimal('.01')),
        'amount': '20.00',
        # 'item_name': 'Order {}'.format(order.id),
        'item_name': 'Order {}'.format("2"),
        # 'invoice': str(order.id),
        'invoice': "2",
        'currency_code': 'USD',
        'notify_url': 'http://{}{}'.format(host,
                                           reverse('paypal-ipn')),
        'return_url': 'http://{}{}'.format(host,
                                           reverse('payment_done')),
        'cancel_return': 'http://{}{}'.format(host,
                                              reverse('payment_cancelled')),
    }
 
    form = PayPalPaymentsForm(initial=paypal_dict)
    return render(request, 'process_payment.html', {'order': "", 'form': form})

@csrf_exempt
def payment_done(request):
    return render(request, 'payment_done.html')
 
 
@csrf_exempt
def payment_canceled(request):
    return render(request, 'payment_canceled.html')