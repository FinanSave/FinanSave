import re
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from backend.repositories.movimentacao_repository import RepositorioMovimentacao

class ControladorMovimentacao:

    def __init__(self):
        self.repositorio_movimentacoes = RepositorioMovimentacao()
   
    def criar_movimentacao(self, nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):
        if not all ([nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente]):
            raise ValueError("Todos os campos são obrigatórios.")
        return self.repositorio_movimentacoes.criar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente)

    def buscar_movimentacoes(self):
        return self.repositorio_movimentacoes.buscar_movimentacao()
    
    def buscar_movimentacao_tipo(self, tipo): #Busca de uma movimentação através do tipo
        return self.repositorio_movimentacoes.buscar_movimentacao_tipo(tipo)

    def buscar_movimentacao_categoria(self, categoria): #Busca de uma movimentação através da categoria
        return self.buscar_movimentacao_categoria(categoria)

    def buscar_movimentacao_data(self, data): #Busca de uma movimentação através da data
        return self.repositorio_movimentacoes.buscar_movimentacao_data(data)

    def buscar_movimentacao_recorrente(self, recorrente): #Busca de uma movimentação através da recorrencia
        return self.repositorio_movimentacoes.buscar_movimentacao_recorrente()

    def atualizar_movimentacao(self, nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):
        return self.repositorio_movimentacoes.atualizar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente)

    def deletar_movimentacao(self, id):
        return self.repositorio_movimentacoes.deletar_movimentacao(id)