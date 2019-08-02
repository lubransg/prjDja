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

class SDO_Order(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=50)
    address = models.CharField(max_length=300)
    date = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    def __str__(self):
        return "{}:{}".format(self.id, self.email)
    def total_cost(self):
        return sum([ li.cost() for li in self.lineitem_set.all() ] )