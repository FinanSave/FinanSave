from django.db import models

from orcamento_model import Orcamento

class Movimentacao(models.Model):
    nome = models.CharField(max_length= 255)
    categoria = models.TextChoices("Transporte", "Comida", "Roupas", "Lazer", "Outros")
    orcamento = models.ForeignKey(Orcamento)
    tipo = models.TextChoices("Entrada", "Saida")
    valor = data = models.DateField
    quer_ser_lembrado = models.BooleanField
    recorrente = models.BooleanField