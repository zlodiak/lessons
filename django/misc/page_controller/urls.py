from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.conf import settings

admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'mysite.views.inner_page', name='index_page'),
	url(r'^blog/', include('blog.urls')),
	url(r'^admin/', include(admin.site.urls)),
    url(r'^(?P<slug>.*?)/', 'mysite.views.inner_page', name='inner_page'),	
)






