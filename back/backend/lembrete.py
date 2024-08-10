class Lembrete:
    def __init__(self, movimentacao: 'Movimentacao', mensagem: str): # ao definir classe movimentacao retirar ' '
        self.movimentacao = movimentacao
        self.mensagem = mensagem

    def printarMensagem(self):
        print(self.mensagem)

    def getMovimentacao(self):
        return self.movimentacao