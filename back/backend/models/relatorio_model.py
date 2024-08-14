from django.db import models
from orcamento_model import Orcamento

class Relatorio(models.Model):
    orcamento = models.ForeignKey(Orcamento)