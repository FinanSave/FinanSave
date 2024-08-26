from backend.models.orcamento_model import Orcamento

class RepositorioOrcamento:
    @staticmethod
    def criar_orcamento(user_id, saldo, limite_gastos, meta_economia):
      orcamento = Orcamento.objects.create(user_id=user_id, saldo=saldo, limite_gastos=limite_gastos, meta_economia=meta_economia)
      return orcamento
    
    @staticmethod
    def buscar_orcamentos():
      return Orcamento.objects.all()
    
    @staticmethod
    def buscar_orcamento_por_user_id(user_id):
      return Orcamento.objects.filter(user_id=user_id).first()

    @staticmethod
    def atualizar_orcamento(user_id, saldo=None, limite_gastos=None, meta_economia=None):
      orcamento = Orcamento.objects.filter(user_id=user_id).first()
      if  orcamento:
        if saldo:
          orcamento.saldo = saldo
        if limite_gastos:
          orcamento.limite_gastos = limite_gastos
        if meta_economia:
          orcamento.meta_economia = meta_economia
        orcamento.save()
      return orcamento
    
    @staticmethod
    def buscar_orcamento_por_orcamento_id(id):
      return Orcamento.objects.filter(id==id).first()
    
    @staticmethod
    def deletar_orcamento(user_id):
      orcamento = Orcamento.objects.filter(user_id=user_id).first()
      if orcamento:
        orcamento.delete()
        return f"Orçamento {user_id} foi deletado com sucesso"
      return None
    