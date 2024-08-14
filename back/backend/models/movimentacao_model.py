from django.db import models

class Movimentacao(models.Model):
    nome = models.CharField(max_length= 255)
    categoria = models.TextChoices("Transporte", "Comida", "Roupas", "Lazer", "Outros")
    valor = data = models.DateField
    quer_ser_lembrado = models.BooleanField
    recorrente = models.BooleanField