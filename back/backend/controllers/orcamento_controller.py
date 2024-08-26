import re
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from backend.repositories.orcamento_repository import RepositorioOrcamento

class ControladorOrcamento:
    def __init__(self):
        self.repositorio_orcamentos = RepositorioOrcamento()

    def criar_orcamento(self, user_id, saldo, limite_gastos, meta_economia):
        if not all([saldo, user_id, limite_gastos, meta_economia]):
            raise ValueError("Todos os campos são obrigatórios")
    
        return self.repositorio_orcamentos.criar_orcamento(user_id, saldo, limite_gastos, meta_economia)
    
    def buscar_orcamentos(self):
        return self.repositorio_orcamentos.buscar_orcamentos()
    
    def buscar_orcamento_por_user_id(self, id):
        return self.repositorio_orcamentos.buscar_orcamento_por_user_id(id)

    def atualizar_orcamento(self, user_id, saldo, limite_gastos, meta_economia):
        orcamento = self.repositorio_orcamentos.buscar_orcamento_por_user_id(user_id)
        if orcamento:
            return self.repositorio_orcamentos.atualizar_orcamento(user_id, saldo, limite_gastos, meta_economia)
        else: 
            return None

    def deletar_orcamento(self, user_id):
        return self.repositorio_orcamentos.deletar_orcamento(user_id)
    
    def buscar_orcamento_por_orcamento_id(self, id):
        orcamento = self.repositorio_orcamentos.buscar_orcamento_por_orcamento_id(id)
        if orcamento:
            return orcamento
        else:
            return None

    
    def ver_saldo(self, user_id):
        orcamento = self.repositorio_orcamentos.buscar_orcamento_por_user_id(user_id)
        if orcamento:
            return orcamento.saldo
        else:
            return None
    