from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('app_mailsender',
	url(r'^$', 'views.feedback', name='feedback'),
)


