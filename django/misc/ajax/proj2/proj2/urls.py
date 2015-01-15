from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'proj2.views.index_page'),
	url(r'^call/$', 'call.views.save_call'),
) 
