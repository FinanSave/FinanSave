from typing import List

class Relatorio:
    def __init__(self, orcamento: 'Orcamento'): # ao definir classe Orcamento retirar ' '
        self.orcamento = orcamento
        self.relatorios: List = [] # lista de movimentacoes

    def exportarDashboard(self):
        print("informações de um dashboard...")
        # extracao de dados do banco de dados? das classes em si? 