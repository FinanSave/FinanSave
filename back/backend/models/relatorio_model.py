from typing import List

class Relatorio: # FAZER NO PADRAO DJANGO
    def __init__(self, orcamento: 'Orcamento'): # ao definir classe Orcamento retirar ' '
        self.orcamento = orcamento
        self.relatorios: List = [] # lista de movimentacoes