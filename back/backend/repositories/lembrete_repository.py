from backend.models.lembrete_model import Lembrete

class RepositorioLembrete:
    @staticmethod
    def criar_lembrete(movimentacao, mensagem):
        lembrete = Lembrete.objects.create(movimentacao=movimentacao, mensagem=mensagem)
        return lembrete
    
    @staticmethod
    def buscar_lembretes():
        return Lembrete.objects.all()
    
    @staticmethod
    def buscar_lembrete_movimentacao(movimentacao): # retorna o lembrete associado a uma movimentacao
        return Lembrete.objects.filter(movimentacao=movimentacao)
    
    @staticmethod
    def atualizar_lembrete(movimentacao, mensagem=None):
        lembrete = Lembrete.objects.filter(movimentacao=movimentacao).first()
        if lembrete: # caso o objeto seja encontrado/exista
            if mensagem:
                    lembrete.mensagem = mensagem
            lembrete.save()
        return lembrete
    
    @staticmethod
    def deletar_lembrete(movimentacao):
        lembrete = Lembrete.objects.filter(movimentacao=movimentacao)
        if lembrete:
            lembrete.delete()
        return None