from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader, RequestContext
from mysite.models import Page

	
def inner_page(request, slug='index'):
	t = loader.get_template('inner_page.html')
	c = None
	
	if slug == 'index':
		content = Page.get_main_pages()
		c = RequestContext(request, {
			'title': 'Main page',
			'content': content,
		})		
	else:
		content = Page.get_page(slug)
		c = RequestContext(request, {
			'title': slug,
			'content': content,
		})
		
	try:
		c != None
	except NameError:
		raise Http404
	else:
		return HttpResponse(t.render(c))  		
