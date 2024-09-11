import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.relatorio_controller import ControladorRelatorio

controlador_relatorio = ControladorRelatorio()

def mesToInt (mes):
    meses = [
        {'Janeiro': 1}, {'Fevereiro': 2}, {'Março': 3}, {'Abril': 4}, {'Maio': 5}, {'Junho': 6}, {'Julho': 7}, {'Agosto': 8}, {'Setembro': 9}, {'Outubro': 10}, {'Novembro': 11}, {'Dezembro': 12}
    ]
    mes_int = 0

    for dicionario in meses:
        if mes in dicionario:
            mes_int = dicionario[mes]
    return mes_int

@csrf_exempt
def criar_dashboard(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            mes = data.get('mes')

            entrada, saida = controlador_relatorio.criar_dashboard(user_id, mes)
            
            mes = mesToInt(mes)

            # Gera a URL das imagens
            base_url = f"{request.scheme}://{request.get_host()}"
            imagens = {
                "pizza": f"{base_url}/media/dashboard/{user_id}_{mes}_pizza.png",
                "barras": f"{base_url}/media/dashboard/{user_id}_{mes}_barras.png",
                "linhas": f"{base_url}/media/dashboard/{user_id}_{mes}_linhas.png",
            }

            return JsonResponse({
                "message": "Relatório criado com sucesso",
                "total_entradas": entrada,
                "total_gastos": saida,
                "imagens": imagens
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

