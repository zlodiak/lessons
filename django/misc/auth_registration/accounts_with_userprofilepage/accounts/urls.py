from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.conf import settings

admin.autodiscover()

urlpatterns = patterns('accounts',
	url(r'^login/$', 'views.login'),
	url(r'^auth/$', 'views.auth_view'),
	url(r'^logout/$', 'views.logout'),	
	url(r'^loggedin/$', 'views.loggedin'),
	url(r'^invalid_login/$', 'views.invalid_login'),
	url(r'^registration/$', 'views.registration'),
	url(r'^registration_success/$', 'views.registration_success'),
)



