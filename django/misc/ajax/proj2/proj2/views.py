from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render_to_response
from django.template import loader, RequestContext
	
def index_page(request):
	t = loader.get_template('index.html')
	c = RequestContext(request, {})
	return HttpResponse(t.render(c))		 	
    
    
