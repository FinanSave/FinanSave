from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nome = models.CharField(max_length=255, blank=True, null=True)
    login = models.CharField(max_length=100, unique=True)
    senha = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.login
