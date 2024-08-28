from django.db import models
from django.utils import timezone

class Orcamento(models.Model):
    
    user = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    saldo =  models.DecimalField(decimal_places=2, max_digits=10)
    limite_gastos = models.DecimalField(decimal_places=2, max_digits=10)
    meta_economia = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return (f"Orcamento(id={self.id}, saldo={self.saldo}, "
                f"limte_gastos={self.limite_gastos}, meta_economia={self.meta_economia})")
