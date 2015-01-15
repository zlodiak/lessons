from django import template
from call.models import CallForm

register = template.Library()


@register.inclusion_tag("call_form.html")
def show_form(request):
	return {
		"form": CallForm()
	}
