from backend.models.relatorio_model import Relatorio

class RepositorioRelatorio:
    @staticmethod
    def criar_relatorio(orcamento):
        relatorio = Relatorio.objects.create(orcamento=orcamento)
        return relatorio
    
    @staticmethod
    def buscar_relatorios():
        return Relatorio.objects.all()
    
    @staticmethod
    def atualizar_relatorio(orcamento):
        relatorio = Relatorio.objects.filter(orcamento=orcamento).first()
        if relatorio:
            relatorio.orcamento = orcamento
            relatorio.save()
        return relatorio
    
    @staticmethod
    def deletar_relatorio(orcamento):
        relatorio = Relatorio.objects.filter(orcamento=orcamento).first()
        if relatorio:
            relatorio.delete()
        return None
