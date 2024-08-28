import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.relatorio_controller import ControladorRelatorio

controlador_relatorio = ControladorRelatorio()

@csrf_exempt
def criar_relatorio(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            orcamento = data.get('orcamento')

            relatorio = controlador_relatorio.criar_relatorio(orcamento)
            return JsonResponse({
                "message": "Relatório criado com sucesso",
                "relatorio": {
                    "orcamento": relatorio.orcamento
                }
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_relatorio(request, orcamento):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            # Atualizações podem ser realizadas aqui, dependendo dos campos que você deseja atualizar.
            relatorio = controlador_relatorio.atualizar_relatorio(orcamento)
            if relatorio:
                return JsonResponse({
                    "message": "Relatório atualizado com sucesso",
                    "relatorio": {
                        "orcamento": relatorio.orcamento
                    }
                })
            else:
                return JsonResponse({"error": "Relatório não encontrado"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_relatorio(request, orcamento):
    if request.method == "DELETE":
        relatorio = controlador_relatorio.deletar_relatorio(orcamento)
        if relatorio:
            return JsonResponse({"success": "Relatório deletado com sucesso"})
        else:
            return JsonResponse({"error": "Relatório não encontrado"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def buscar_relatorios(request):
    if request.method == "GET":
        relatorios = controlador_relatorio.buscar_relatorios()
        relatorios_data = [{"orcamento": r.orcamento} for r in relatorios]
        return JsonResponse(relatorios_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)
