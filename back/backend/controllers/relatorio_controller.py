from backend.repositories.relatorio_repository import RepositorioRelatorio

class ControladorRelatorio:
    def __init__(self):
        self.repositorio_relatorios = RepositorioRelatorio()

    @staticmethod
    def criar_relatorio(self, orcamento):
        if not orcamento:
            raise ValueError("Orçamento é obrigatório")
        return self.repositorio_relatorios.criar_relatorio(orcamento)

    @staticmethod
    def buscar_relatorios(self):
        return self.repositorio_relatorios.buscar_relatorios()

    @staticmethod
    def atualizar_relatorio(self, orcamento):
        if not orcamento:
            raise ValueError("Orçamento é obrigatório")
        return self.repositorio_relatorios.atualizar_relatorio(orcamento)

    @staticmethod
    def deletar_relatorio(self, orcamento):
        if not orcamento:
            raise ValueError("Orçamento é obrigatório")
        return self.repositorio_relatorios.deletar_relatorio(orcamento)
