from django.db import models
from .movimentacao_model import Movimentacao

class Lembrete(models.Model):  
    movimentacao = models.ForeignKey(Movimentacao)
    mensagem = models.CharField(max_length=255) 

    def __str__(self): #toString
        return self.movimentacao, self.mensagem
