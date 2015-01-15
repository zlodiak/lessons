from django.db import models

class ReviewsFancy(models.Model):		
	title = models.CharField(max_length=30)
	name = models.CharField(max_length=30)
	message = models.CharField(max_length=300)		

