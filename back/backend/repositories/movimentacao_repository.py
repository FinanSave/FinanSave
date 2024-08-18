from backend.models.movimentacao_model import Movimentacao

class RepositorioMovimentacao:
    
    @staticmethod
    def criar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):
        movimentacao = Movimentacao.objects.create(nome = nome, categoria = categoria, orcamento = orcamento, tipo = tipo, valor = valor, data = data, quer_ser_lembrado = quer_ser_lembrado, recorrente = recorrente)
        return movimentacao

    @staticmethod
    def buscar_movimentacao():
        return Movimentacao.objects.all()
    
    @staticmethod
    def buscar_movimentacao_tipo(tipo): #Busca de uma movimentação através do tipo
        return Movimentacao.objects.filter(tipo = tipo)
    
    @staticmethod
    def buscar_movimentacao_categoria(categoria): #Busca de uma movimentação através da categoria
        return Movimentacao.objects.filter(categoria = categoria)
    
    @staticmethod
    def buscar_movimentacao_data(data): #Busca de uma movimentação através da data
        return Movimentacao.objects.filter(data = data)
    
    @staticmethod
    def buscar_movimentacao_recorrente(recorrente): #Busca de uma movimentação através da recorrencia
        return Movimentacao.objects.filter(recorrente = recorrente)

    @staticmethod
    def atualizar_movimentacao(nome, categoria, orcamento, tipo, valor, data, quer_ser_lembrado, recorrente):
        movimentacao = Movimentacao.objects.filter(nome = nome, categoria = categoria, orcamento = orcamento, tipo = tipo, valor = valor, data = data, quer_ser_lembrado = quer_ser_lembrado, recorrente = recorrente).first()
        if movimentacao: # caso o objeto seja encontrado/exista
            if movimentacao:
                    movimentacao.nome = nome
                    movimentacao.categoria = categoria
                    movimentacao.orcamento = orcamento
                    movimentacao.tipo = tipo
                    movimentacao.valor = valor
                    movimentacao.data = data
                    movimentacao.quer_ser_lembrado = quer_ser_lembrado
                    movimentacao.recorrente = recorrente
            movimentacao.save()
        return movimentacao

    @staticmethod
    def deletar_movimentacao(id):
        movimentacao = Movimentacao.objects.filter(id=id).first()
        if movimentacao: # caso o objeto seja encontrado/exista
            movimentacao.delete()
            return f"Movimnetação {id} foi deletada com sucesso"
        return None