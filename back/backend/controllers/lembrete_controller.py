from backend.repositories.lembrete_repository import RepositorioLembrete

class ControladorLembrete:
    def __init__(self):
        self.repositorio_lembretes = RepositorioLembrete()

    def criar_lembrete(self, movimentacao, mensagem):
        if not all([movimentacao, mensagem]):
            raise ValueError("Movimentação e mensagem são obrigatórios")
        return self.repositorio_lembretes.criar_lembrete(movimentacao, mensagem)

    def buscar_lembretes(self):
        return self.repositorio_lembretes.buscar_lembretes()

    def buscar_lembrete_por_movimentacao(self, movimentacao):
        if not movimentacao:
            raise ValueError("Movimentação é obrigatória")
        return self.repositorio_lembretes.buscar_lembrete_movimentacao(movimentacao)

    def atualizar_lembrete(self, movimentacao, mensagem=None):
        if not movimentacao:
            raise ValueError("Movimentação é obrigatória")
        return self.repositorio_lembretes.atualizar_lembrete(movimentacao, mensagem)

    def deletar_lembrete(self, movimentacao):
        if not movimentacao:
            raise ValueError("Movimentação é obrigatória")
        return self.repositorio_lembretes.deletar_lembrete(movimentacao)
