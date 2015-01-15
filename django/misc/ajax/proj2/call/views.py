from django.http import HttpResponse
from call.models import Call
from django.views.decorators.csrf import csrf_protect


def save_call(request):
    if request.method == "POST" and request.is_ajax():	
        c = Call(
            name=request.POST.get("name", "")[:50],
            email=request.POST.get("email", "")[:150]
        )
        c.save()
        return HttpResponse("ok")
    else:
        return HttpResponse("bad" + request.method + request.is_ajax())
