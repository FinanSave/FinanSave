from backend.models.movimentacao_model import Movimentacao
from backend.models.orcamento_model import Orcamento
from django.utils import timezone

class RepositorioMovimentacao:
    
    @staticmethod
    def criar_movimentacao(nome, categoria, orcamento_id, tipo, valor, quer_ser_lembrado, recorrente, mensagem):
        if Orcamento.objects.filter(id = orcamento_id).exists():
            movimentacao = Movimentacao.objects.create(nome = nome, categoria = categoria, orcamento_id = orcamento_id, tipo = tipo, valor = valor, quer_ser_lembrado = quer_ser_lembrado, recorrente = recorrente, mensagem = mensagem)
            return movimentacao
        else:
            return "Orçamento não encontrado"

    @staticmethod
    def buscar_movimentacoes():
        return Movimentacao.objects.all()
    
    @staticmethod
    def buscar_movimentacao_tipo(tipo): #Busca de uma movimentação através do tipo
        return Movimentacao.objects.filter(tipo = tipo)
    
    @staticmethod
    def buscar_movimentacao_orcamento_id(orcamento_id): #Busca de uma movimentação através do orcamento
        return Movimentacao.objects.filter(orcamento_id = orcamento_id)
    
    @staticmethod
    def buscar_movimentacao_categoria(categoria): #Busca de uma movimentação através da categoria
        return Movimentacao.objects.filter(categoria = categoria)
    
    @staticmethod
    def buscar_movimentacao_data(data): #Busca de uma movimentação através da data
        return Movimentacao.objects.filter(data = data)
    
    @staticmethod
    def buscar_movimentacao_recorrente(recorrente): #Busca de uma movimentação através da recorrencia
        return Movimentacao.objects.filter(recorrente = recorrente)

    @staticmethod
    def atualizar_movimentacao(movimentacao_id, nome=None, categoria=None, tipo=None, valor=None, quer_ser_lembrado=None, recorrente=None):
        movimentacao = Movimentacao.objects.filter(id=movimentacao_id).first()
        if movimentacao: # caso o objeto seja encontrado/exista
            if nome:
                movimentacao.nome = nome
            if categoria:
                movimentacao.categoria = categoria
            if tipo:
                movimentacao.tipo = tipo
            if valor:
                movimentacao.valor = valor
            if quer_ser_lembrado:
                movimentacao.quer_ser_lembrado = quer_ser_lembrado
            if recorrente:
                movimentacao.recorrente = recorrente

            movimentacao.updated_at = timezone.now()
        movimentacao.save()
        return movimentacao

    @staticmethod
    def deletar_movimentacao(id):
        movimentacao = Movimentacao.objects.filter(id=id).first()
        if movimentacao: # caso o objeto seja encontrado/exista
            movimentacao.delete()
            return f"Movimentação {id} foi deletada com sucesso"
        return None