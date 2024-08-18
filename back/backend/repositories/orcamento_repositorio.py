from backend.models.user_model import Orcamento

class RepositorioOrcamento:
    @staticmethod
    def criar_orcamento(saldo, limte_gastos, meta_economia):
      orcamento = Orcamento.objects.create(saldo=saldo, limte_gastos=limte_gastos, meta_economia=meta_economia)
      return orcamento
    
    @staticmethod
    def buscar_orcamento():
      return Orcamento.objects.all()
    
    @staticmethod
    def atualizar_orcamento(orcamento_id, saldo=None, limte_gastos=None, meta_economia=None):
      orcamento = Orcamento.objects.filter(id=orcamento_id).first()
      if  orcamento:
        if saldo:
          orcamento.saldo = saldo
        if limte_gastos:
          orcamento.limte_gastos = limte_gastos
        if meta_economia:
          orcamento.meta_economia = meta_economia
        orcamento.save()
      return orcamento
    
    @staticmethod
    def deletar_orcamento(orcamento_id):
      orcamento = Orcamento.objects.filter(id=orcamento_id).first()
      if orcamento:
        orcamento.delete()
        return orcamento
      return None
    
