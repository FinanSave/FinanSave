from django.db import models
from django.utils import timezone
from .movimentacao_model import Movimentacao

class Lembrete(models.Model):  
    movimentacao = models.ForeignKey(Movimentacao, on_delete=models.CASCADE)
    mensagem = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self): #toString
        return self.movimentacao, self.mensagem
