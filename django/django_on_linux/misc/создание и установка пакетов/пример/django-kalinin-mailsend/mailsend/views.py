# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseForbidden
from django.template import loader, RequestContext
from django.shortcuts import render, render_to_response
from django.core.mail import send_mail

from mailsend.models import Feedback
from mailsend.forms import FeedbackForm


def feedback(request):	
	'''
	page for output feedback form
	'''
	feedback_form =  FeedbackForm()	

	if request.method == 'POST':	
		feedback_form =  FeedbackForm(request.POST)	

		if feedback_form.is_valid():	
			username = request.POST.get('username', '')	
			subject = request.POST.get('subject', '')	
			email = request.POST.get('email', '')	
			message = request.POST.get('message', '')	

			try:
				Feedback.objects.create(
					username=username.strip(), 
					subject=subject.strip(), 
					email=email.strip(), 
					message=message.strip(), 
				)

				# send_mail(
				# 	subject,
				# 	message,
				# 	['mailsender2015@yandex.ru'], 	# my email
				# 	email,							# sender email
				# )				
			except:
				print('error in try block')
			else:
				t = loader.get_template('page_feedback_ok.html')
				c = RequestContext(request, {})	
				
				return HttpResponse(t.render(c)) 	

	t = loader.get_template('page_feedback.html')
	c = RequestContext(request, {		
		'feedback_form': feedback_form,
	})	
	
	return HttpResponse(t.render(c)) 	

