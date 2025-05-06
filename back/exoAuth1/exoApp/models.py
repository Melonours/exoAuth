from pyexpat import model
from typing import Required
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = None
    nom = models.CharField(max_length=32, null=False)
    prenom = models.CharField(max_length=32, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=1000, null=False)

    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = [nom, prenom]

class Article(models.Model):
    titre = models.CharField(max_length=64)
    texte = models.TextField(max_length=1000)
    date = models.DateField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
