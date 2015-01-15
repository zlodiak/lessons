from django import forms
from reviewsFancy.models import ReviewsFancy
from django.forms import ModelForm

class ReviewsFancyForm(ModelForm):
    class Meta:
        model = ReviewsFancy


