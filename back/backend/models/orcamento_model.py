from django.db import models
from django.utils import timezone

class Orcamento(models.Model):
    user = models.OneToOneField('Usuario', on_delete=models.CASCADE, unique=True) 
    saldo = models.DecimalField(decimal_places=2, max_digits=10)
    limite_gastos = models.DecimalField(decimal_places=2, max_digits=10)
    meta_economia = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Orcamento(id={self.id}, saldo={self.saldo}, limite_gastos={self.limite_gastos}, meta_economia={self.meta_economia})"
