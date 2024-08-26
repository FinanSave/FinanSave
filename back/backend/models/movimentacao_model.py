from django.db import models
from django.utils import timezone
from .orcamento_model import Orcamento

class Movimentacao(models.Model):

    class Categoria(models.TextChoices):
        TRANSPORTE = "Transporte", "Transporte"
        COMIDA = "Comida", "Comida"
        ROUPAS = "Roupas", "Roupas"
        LAZER = "Lazer", "Lazer"
        OUTROS = "Outros", "Outros"

    nome = models.CharField(max_length=255)
    categoria = models.CharField(max_length=50, choices=Categoria.choices)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    quer_ser_lembrado = models.BooleanField(default=False)
    recorrente = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.nome} - {self.categoria} - R${self.valor:.2f}"
