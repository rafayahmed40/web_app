from django.db import models
from django.core.validators import int_list_validator

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="")
    jobs = models.CharField(max_length=100, default="")
