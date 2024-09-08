from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nome = models.CharField(max_length=255, blank=True, null=True)
    login = models.CharField(max_length=100, unique=True, default='login')
    senha = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True, default='email@email.com')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.login
