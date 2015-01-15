from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('mailsend',
	url(r'^$', 'views.feedback', name='feedback'),
)


