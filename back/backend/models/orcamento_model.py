from django.db import models

class Orcamento(models.Model):
    
    saldo =  models.DecimalField(decimal_places=2, max_digits=10)
    limte_gastos = models.DecimalField(decimal_places=2, max_digits=10)
    meta_economia = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"Orcamento(id={self.id}, saldo={self.saldo}, "
                f"limte_gastos={self.limte_gastos}, meta_economia={self.meta_economia})")





