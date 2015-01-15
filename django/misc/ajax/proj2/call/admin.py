from django.contrib import admin
from .models import Call


class CallAdmin(admin.ModelAdmin):
   list_display = ('name', 'email')


admin.site.register(Call, CallAdmin)
