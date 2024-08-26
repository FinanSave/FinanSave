from django.db import models
from django.utils import timezone
from .orcamento_model import Orcamento

class Relatorio(models.Model):
    orcamento = models.ForeignKey(Orcamento, on_delete=models.CASCADE )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)