from django.db import models

from back.backend.models.user_model import Usuario

class Orcamento(models.Model):
    usuario = models.ForeignKey(Usuario)
    saldo = models.DecimalField(max_digits = 10, decimal_places = 2)
    limite_gastos = models.DecimalField(max_digits = 10, decimal_places = 2, blank = True)
    meta_economia = models.DecimalField(max_digits = 10, decimal_places = 2)