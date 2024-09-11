import os
from django.apps import AppConfig
from datetime import date

class RecorrenciaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recorrencia'  

    def ready(self):
        print("chamou")
        if os.environ.get('RUN_MAIN') == 'true':
            self.criar_movimentacoes_recorrentes()

    def criar_movimentacoes_recorrentes(self):
        print("Rodou Man")
        from backend.models.movimentacao_model import Movimentacao


        # Filtra todas as movimentações recorrentes cuja próxima movimentação seja hoje
        movimentacoes = Movimentacao.objects.filter(recorrente=True, proxima_movimentacao=date.today())

        # Para cada movimentação recorrente encontrada, criar uma nova movimentação
        for movimentacao in movimentacoes:
            movimentacao.criar_nova_movimentacao()

