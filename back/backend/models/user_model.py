from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255, blank=True, null=True)
    login = models.CharField(max_length=100, unique=True)
    senha = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.login
