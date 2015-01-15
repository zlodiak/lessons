from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader, RequestContext
from django.contrib import auth
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from accounts.forms import MyRegistrationForm
from django.shortcuts import render
		
	
def login(request):
	form = AuthenticationForm()	#
	t = loader.get_template('login.html')
	c = RequestContext(request, {
		'form': form, #
	})	
	return HttpResponse(t.render(c)) 
	
	
def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)
	
	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/accounts/loggedin/')
	else:
		return HttpResponseRedirect('/accounts/invalid_login/')
		
		
def logout(request):
	auth.logout(request)
	t = loader.get_template('logout.html')
	c = RequestContext(request, {})	
	return HttpResponse(t.render(c)) 		
	
	
def loggedin(request):
	t = loader.get_template('loggedin.html')
	c = RequestContext(request, {
		'full_name': request.user.username,
	})	
	return HttpResponse(t.render(c)) 	
	
	
def invalid_login(request):
	t = loader.get_template('invalid_login.html')
	c = RequestContext(request, {})	
	return HttpResponse(t.render(c)) 	
	

def registration(request):
	if request.method == 'POST':
		form = MyRegistrationForm(request.POST)	#
		if form.is_valid():
			new_user = form.save()
			return HttpResponseRedirect("/accounts/registration_success/")
	else:
		form = MyRegistrationForm()
		
	return render(request, "registration.html", {
		'form': form,	#
	})	
	
	
def registration_success(request):
	t = loader.get_template('registration_success.html')
	c = RequestContext(request, {})	
	return HttpResponse(t.render(c)) 				
 
