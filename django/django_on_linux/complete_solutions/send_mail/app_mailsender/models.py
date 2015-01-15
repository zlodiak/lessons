# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime  


class Feedback(models.Model):
	username = models.CharField(
		verbose_name=u"Имя", 
		max_length=100,
		blank=True,
		null=True,
		default=None,
	)
	subject = models.CharField(
		verbose_name=u"Тема", 
		max_length=100,
		blank=False,
		default=None,
	)	
	email = models.EmailField(
		verbose_name=u"Email", 
		max_length=100,
		blank=False,
		null=False,
		default=None,
	)		
	message = models.TextField(
		verbose_name=u'Сообщение',
		max_length=50000, 
		blank=False,
		default=None,
	)			
	date = models.DateTimeField(
		verbose_name=u'Дата создания',
		default=datetime.now(),
		auto_now=True,
	)				

	class Meta:
		verbose_name = u"""Сообщение"""
		verbose_name_plural = u"""Сообщения"""



