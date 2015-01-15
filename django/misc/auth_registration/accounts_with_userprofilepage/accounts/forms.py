from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm



class MyRegistrationForm(UserCreationForm):
	email = forms.EmailField(required=True)
	first_name = forms.CharField(required=True)
	
	class Meta:
		model = User
		fields = ('username', 'email', 'password1', 'password2', 'first_name')
		
	def save(self, commit=True):
		user = super(MyRegistrationForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		user.first_name = self.cleaned_data['first_name']
		
		if commit:
			user.save()
			
		return user

