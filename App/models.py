from django.db import models

# Create your models here.

class Contact(models.Model):
    name =models.CharField(max_length=111)
    email = models.CharField(max_length=111)
    phone = models.CharField(max_length=111)
    message = models.TextField()
    date = models.DateField()
    
    def __str__(self) -> str:
        return f" Name: {self.name} || Email: {self.email}"



