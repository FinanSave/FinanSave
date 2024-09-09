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

    def __str__(self):
        return f"{self.nome} - {self.categoria} - R${self.valor:.2f}"
    
    def salvar_proxima_movimentacao(self):
        if self.recorrente:
            # Calcula a data do próximo mês
            proximo_mes = self.created_at.month + 1 if self.created_at.month < 12 else 1
            ano_proximo = self.created_at.year + 1 if proximo_mes == 1 else self.created_at.year
            dia_proximo = min(self.created_at.day, (date(ano_proximo, proximo_mes, 1) - timedelta(days=1)).day)
            
            self.proxima_movimentacao = date(ano_proximo, proximo_mes, dia_proximo)
            self.save()

    def criar_nova_movimentacao(self):
        if self.recorrente and self.proxima_movimentacao and date.today() == self.proxima_movimentacao:
            # Recria a movimentacao e define a próxima data
            nova_movimentacao = Movimentacao.objects.create(
                nome = self.nome
                categoria = self.categoria
                valor = self.valor
                orcamento = self.orcamento
                tipo = self.tipo
                quer_ser_lembrado = self.quer_ser_lembrado
                recorrente = self.recorrente
                mensagem = self.mensagem
                created_at = self.created_at
                updated_at = self.updated_at
            )
            nova_movimentacao.salvar_proxima_movimentacao()
            return nova_movimentacao
