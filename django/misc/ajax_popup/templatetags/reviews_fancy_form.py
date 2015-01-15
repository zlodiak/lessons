from django import template
from reviewsFancy.forms import ReviewsFancyForm

register = template.Library()


@register.inclusion_tag("ReviewsFancyForm.html")
def reviews_fancy_form():
	return {
		"ReviewsFancyForm": ReviewsFancyForm(),
	}
