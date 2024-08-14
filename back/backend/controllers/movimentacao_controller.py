from back.backend.repositories.movimentacao_repository import RepositorioMovimentacao

class ControladorMovimentacao:
    def __init__(self):
        self.repositorio_movimentacoes = RepositorioMovimentacao()

    @staticmethod
    def criar_movimentacao(self, nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):
        if not all ([nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente]):
            raise ValueError("Todos os campos são obrigatórios.")
        return self.repositorio_movimentacoes.criar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente)

    @staticmethod
    def buscar_movimentacao():

    @staticmethod
    def buscar_movimentacao_tipo(tipo): #Busca de uma movimentação através do tipo

    @staticmethod
    def buscar_movimentacao_categoria(categoria): #Busca de uma movimentação através da categoria

    @staticmethod
    def buscar_movimentacao_data(data): #Busca de uma movimentação através da data

    @staticmethod
    def buscar_movimentacao_recorrente(recorrente): #Busca de uma movimentação através da recorrencia

    @staticmethod
    def atualizar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):

    @staticmethod
    def deletar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):