from datetime import date
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
    mensagem = models.CharField(max_length=255, blank=True, null=True)
    data_movimentacao = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    proxima_movimentacao = models.DateField(default=timezone.now, editable= False)

    def __str__(self):
        return f"{self.nome} - {self.categoria} - R${self.valor:.2f}"
    
    def salvar_proxima_movimentacao(self):
        if self.recorrente:
            # Calcula a data do próximo mês
            proximo_mes = self.data_movimentacao.month + 1 if self.data_movimentacao.month < 12 else 1
            ano_proximo = self.data_movimentacao.year + 1 if proximo_mes == 1 else self.data_movimentacao.year
            dia_proximo = min(self.data_movimentacao.day, (date(ano_proximo, proximo_mes, 1) - timedelta(days=1)).day)
            
            self.proxima_movimentacao = date(ano_proximo, proximo_mes, dia_proximo)
            self.recorrente = False
            self.save()

    def criar_nova_movimentacao(self):
        if self.recorrente and self.proxima_movimentacao and date.today() == self.proxima_movimentacao:
            # Recria a movimentacao e define a próxima data
            nova_movimentacao = Movimentacao.objects.create(
                nome = self.nome,
                categoria = self.categoria,
                valor = self.valor,
                orcamento = self.orcamento,
                tipo = self.tipo,
                quer_ser_lembrado = self.quer_ser_lembrado,
                recorrente = True,
                mensagem = self.mensagem,
                data_movimentacao = self.data_movimentacao,
            )
            nova_movimentacao.salvar_proxima_movimentacao()
            return nova_movimentacao