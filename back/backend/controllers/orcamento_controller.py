import re
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from backend.repositories.orcamento_repositorio import RepositorioOrcamento

class ControladorOrcamento:
    def __init__(self):
        self.repositorio_orcamentos = RepositorioOrcamento()

    def criar_orcamentoo(self, saldo, limte_gastos, meta_economia):
        if not all([saldo, limte_gastos, meta_economia]):
            raise ValueError("Todos os campos são obrigatórios")
    
        return self.repositorio_orcamentos.criar_orcamento(saldo, limte_gastos, meta_economia)
    
    def buscar_orcamento(self):
        return self.repositorio_orcamentos.buscar_orcamento()

    def atualizar_usuario(self, saldo, limte_gastos, meta_economia):
        return self.repositorio_orcamentos.atualizar_orcamento(id, saldo, limte_gastos, meta_economia)

    def deletar_orcamento(self, id):
        return self.repositorio_orcamentos.deletar_orcamento(id)