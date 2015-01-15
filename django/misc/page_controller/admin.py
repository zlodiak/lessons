from django.contrib import admin
from mysite.models import Page


class PageAdmin(admin.ModelAdmin):
	fields = ['title', 'menu_punkt', 'slug', 'content', 'show_on_index']	
	list_display = ['title']
	search_fields = ['title']	

	
admin.site.register(Page, PageAdmin)

