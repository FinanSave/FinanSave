import re
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from backend.repositories.movimentacao_repository import RepositorioMovimentacao
from backend.repositories.orcamento_repository import RepositorioOrcamento
from backend.controllers.lembrete_controller import ControladorLembrete

class ControladorMovimentacao:

    def __init__(self):
        self.repositorio_movimentacoes = RepositorioMovimentacao()
        self.repositorio_orcamento = RepositorioOrcamento()
        self.controlador_lembrete = ControladorLembrete()

    def buscar_movimentacoes(self):
        return self.repositorio_movimentacoes.buscar_movimentacoes()
    
    def buscar_movimentacao_tipo(self, tipo): #Busca de uma movimentação através do tipo
        return self.repositorio_movimentacoes.buscar_movimentacao_tipo(tipo)
    
    def buscar_movimentacao_orcamento_id(self, orcamento_id): #Busca de uma movimentação através do orcamento
        return self.repositorio_movimentacoes.buscar_movimentacao_orcamento_id(orcamento_id)
    
    def buscar_movimentacao_categoria(self, categoria): #Busca de uma movimentação através da categoria
        return self.repositorio_movimentacoes.buscar_movimentacao_categoria(categoria)

    def buscar_movimentacao_recorrente(self, recorrente): #Busca de uma movimentação através da recorrencia
        return self.repositorio_movimentacoes.buscar_movimentacao_recorrente(recorrente)

    def atualizar_movimentacao(self, movimentacao_id, nome, categoria, tipo, valor, data_movimentacao, quer_ser_lembrado, recorrente):
        return self.repositorio_movimentacoes.atualizar_movimentacao(movimentacao_id, nome, categoria, tipo, valor, data_movimentacao, quer_ser_lembrado, recorrente)
                                                                    
    def deletar_movimentacao(self, id):
        movimentacao = self.repositorio_movimentacoes.buscar_movimentacao_id(id)

        if not movimentacao:
            raise ValueError("Movimentação não encontrada")

        orcamento = self.repositorio_orcamento.buscar_orcamento_por_id(movimentacao.orcamento.id)

        if orcamento:
            if movimentacao.tipo == 'Saida':
                orcamento.saldo += movimentacao.valor
            elif movimentacao.tipo == 'Entrada':
                orcamento.saldo -= movimentacao.valor
            else:
                raise ValueError("Tipo de movimentação inválido")

            orcamento.save()

        return self.repositorio_movimentacoes.deletar_movimentacao(id)
    
    # vai receber o user_id para achar o orçamento através dele
    def registrar_gasto(self, nome, categoria, user_id, valor, data_movimentacao, quer_ser_lembrado=None, recorrente=None, mensagem=None):
        orcamento = self.repositorio_orcamento.buscar_orcamento_por_user_id(user_id)
        if not orcamento:
            raise ValueError("Orçamento não encontrado")

        if orcamento.saldo < valor:
            raise ValueError("Saldo insuficiente para registrar o gasto")

        movimentacao = self.repositorio_movimentacoes.criar_movimentacao(
            nome=nome,
            categoria=categoria,
            orcamento_id=orcamento.id,
            tipo='Saida',
            valor=valor,
            data_movimentacao=data_movimentacao,
            quer_ser_lembrado=quer_ser_lembrado,
            recorrente=recorrente,
            mensagem=mensagem
            )

        orcamento.saldo -= valor
        orcamento.save()

        # para criar o lembrete do gasto
        if quer_ser_lembrado:
            if not mensagem:
                raise ValueError("Uma mensagem é necessária se você quiser ser lembrado(a)")
            self.controlador_lembrete.criar_lembrete(movimentacao, mensagem)

        return movimentacao

    def registrar_entrada(self, nome, categoria, user_id, valor, data_movimentacao, quer_ser_lembrado=None, recorrente=None, mensagem=None):
        orcamento = self.repositorio_orcamento.buscar_orcamento_por_user_id(user_id)
        if not orcamento:
            raise ValueError("Orçamento não encontrado")

        movimentacao = self.repositorio_movimentacoes.criar_movimentacao(
            nome=nome,
            categoria=categoria,
            orcamento_id=orcamento.id,
            tipo='Entrada',
            valor=valor,
            data_movimentacao=data_movimentacao,
            quer_ser_lembrado=quer_ser_lembrado,
            recorrente=recorrente,
            mensagem=mensagem
        )

        orcamento.saldo += valor
        orcamento.save()

        # para criar o lembrete da entrada
        if quer_ser_lembrado:
            if not mensagem:
                raise ValueError("Uma mensagem é necessária se você quiser ser lembrado(a)")
            self.controlador_lembrete.criar_lembrete(movimentacao, mensagem)

        return movimentacao