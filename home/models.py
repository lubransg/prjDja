from django.db import models

# Create your models here.

class SDO_Users(models.Model):
	Code = models.CharField(max_length=25)
	Password = models.CharField(max_length=50)
	Name = models.CharField(max_length=100)
	LastName = models.CharField(max_length=100)
	BirthDate = models.DateField('BirthDate')
	def full_name(self):
		return self.Name
