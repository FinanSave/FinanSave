from backend.repositories.relatorio_repository import RepositorioRelatorio
from backend.controllers.orcamento_controller import ControladorOrcamento
from backend.controllers.movimentacao_controller import ControladorMovimentacao
import pandas as pd
import matplotlib.pyplot as plt

class ControladorRelatorio:
    def __init__(self):
        self.repositorio_relatorios = RepositorioRelatorio()
        self.controlador_orcamento = ControladorOrcamento()
        self.controlador_movimentacao = ControladorMovimentacao()

    def criar_dashboard(self, user_id, mes):
        if not user_id:
            raise ValueError("ID do usuário é obrigatório")
        
        mes_int = 0
        meses = [
        {'Janeiro': 1}, {'Fevereiro': 2}, {'Março': 3}, {'Abril': 4}, {'Maio': 5}, {'Junho': 6}, {'Julho': 7}, {'Agosto': 8}, {'Setembro': 9}, {'Outubro': 10}, {'Novembro': 11}, {'Dezembro': 12}
        ]
        
        # orcamento possui id, limite_gastos, meta, saldo
        orcamento =  self.controlador_orcamento.buscar_orcamento_por_user_id(user_id) # recebe orcamento id

        # conversão do mês string para int
        for dicionario in meses:
            if mes in dicionario:
                mes_int = dicionario[mes]
        
        # verificação de mês
        if mes_int == 0:
            raise ValueError("Você não possui movimentações no mês selecionado.")

        lista_movimentacoes = self.controlador_movimentacao.buscar_movimentacao_orcamento_id(orcamento.id)
        
        # obtendo movimentações do mês especificado
        lista_resultados = []
        for mov in lista_movimentacoes:
            if mov.data_movimentacao.month == mes_int:
                lista_resultados.append(mov)

        # transformando em um dataframe
        data = {
           'id': [mov.id for mov in lista_resultados],
           'nome': [mov.nome for mov in lista_resultados],
           'categoria': [mov.categoria for mov in lista_resultados],
           'recorrente': [mov.recorrente for mov in lista_resultados],
           'valor': [mov.valor for mov in lista_resultados],
           'tipo': [mov.tipo for mov in lista_resultados]
        }

        df = pd.DataFrame(data)
        print(df)

        lista_movimentacoes = self.controlador_movimentacao.buscar_movimentacao_orcamento_id(orcamento.id)
    
        # obtendo movimentações do mês atual
        lista_resultados_mes_atual = [mov for mov in lista_movimentacoes if mov.data_movimentacao.month == mes_int]

        mes_anterior_int = (mes_int - 1) if mes_int > 1 else 12
        lista_resultados_mes_anterior = [mov for mov in lista_movimentacoes if mov.data_movimentacao.month == mes_anterior_int]

        def movimentacoes_para_dataframe(lista_resultados):
            data = {
                'dia': [mov.data_movimentacao.day for mov in lista_resultados],
                'valor': [mov.valor for mov in lista_resultados]
            }
            df = pd.DataFrame(data)
            df['valor'] = pd.to_numeric(df['valor'], errors='coerce')  # garantir que 'valor' é numérico
            return df

        df_atual = movimentacoes_para_dataframe(lista_resultados_mes_atual)
        df_anterior = movimentacoes_para_dataframe(lista_resultados_mes_anterior)

        # PIZZA
        filename_pizza='pizza.png'
        tipo_counts = df['tipo'].value_counts()
        plt.figure(figsize=(8, 8))
        plt.pie(tipo_counts, labels=tipo_counts.index, autopct='%1.1f%%', startangle=140)
        plt.title('Tipos de Movimentação')
        plt.savefig(filename_pizza)
        plt.close()

        # BARRAS
        filename_barras = 'barras.png'
        df['valor'] = pd.to_numeric(df['valor'], errors='coerce')
        categoria_totals = df.groupby('categoria')['valor'].sum()
        plt.figure(figsize=(10, 6))
        categoria_totals.plot(kind='barh', color='yellow')
        plt.title('Movimentações por Categoria')
        plt.xlabel('Valor Total')
        plt.ylabel('Categoria')
        plt.xticks(rotation=45)
        plt.savefig(filename_barras)
        plt.close()

        #LINHAS
        filename_linhas = 'linhas_comparativo.png'
        plt.figure(figsize=(10, 6))
        plt.plot(df_atual.index, df_atual['valor'], label='Mês Atual', marker='o', linestyle='-', color='blue')
        plt.plot(df_anterior.index, df_anterior['valor'], label='Mês Anterior', marker='o', linestyle='--', color='green')
        plt.title('Comparação de Movimentações por Dia (Mês Atual vs Mês Anterior)')
        plt.xlabel('Dias do Mês')
        plt.ylabel('Valor Total')
        plt.legend()
        plt.grid(True)
        plt.savefig(filename_linhas)
        plt.close()

        tipo_totals = df.groupby('tipo')['valor'].sum()
        return tipo_totals

        