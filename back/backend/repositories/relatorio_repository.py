from backend.models.relatorio_model import Relatorio

class RepositorioRelatorio:
    @staticmethod
    def criar_dashboard(orcamento):
        relatorio = Relatorio.objects.create(orcamento=orcamento)
        return relatorio
