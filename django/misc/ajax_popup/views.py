from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader, RequestContext
from reviewsFancy.models import ReviewsFancy
from django.conf import settings
import json

	
def reviewsFancyCall(request):
	if request.method == "POST" and request.is_ajax():	
		c = ReviewsFancy(
			title=request.POST.get("title", ""),
			name=request.POST.get("name", ""),
			message=request.POST.get("message", ""),
		)
		c.save()
        
		with open(settings.BASE_DIR + 'qwe.txt', "wb") as f:
			f.write(bytes('ok', 'UTF-8'))
        
		data = {'result': 'ok',}
	else:
		with open(settings.BASE_DIR + 'qwe.txt', "wb") as f:
			f.write(bytes('no', 'UTF-8'))
					
		data = {'result': 'failed',}

	return HttpResponse(json.dumps(data), content_type='application/json')

	
