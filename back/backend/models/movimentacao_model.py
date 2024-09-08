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

    class Tipo(models.TextChoices):
        ENTRADA = "Entrada", "Entrada"
        SAIDA = "Saida", "Saida"

    nome = models.CharField(max_length=255)
    categoria = models.CharField(max_length=50, choices=Categoria.choices)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    orcamento = models.ForeignKey(Orcamento, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=10, choices=Tipo.choices)
    quer_ser_lembrado = models.BooleanField(default=False)
    recorrente = models.BooleanField(default=False)
    mensagem = models.CharField(max_length=255)
    data_movimentacao = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} - {self.categoria} - R${self.valor:.2f}"
