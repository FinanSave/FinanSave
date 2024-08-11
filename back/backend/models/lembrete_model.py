from django.db import models
from .movimentacao_model import Movimentacao

class Lembrete(models.Model):  # Classe Lembrete no padrão Django
    movimentacao = models.ForeignKey(Movimentacao)
    mensagem = models.CharField(max_length=255)  # Defina o tamanho máximo conforme necessário

    def printar_mensagem(self):
        print(self.mensagem)

    def get_movimentacao(self):
        return self.movimentacao

    def __str__(self):
        return f"Lembrete: {self.mensagem} da movimentacao: {self.movimentacao}"