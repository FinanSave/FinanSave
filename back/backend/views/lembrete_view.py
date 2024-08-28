import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.lembrete_controller import ControladorLembrete

controlador_lembrete = ControladorLembrete()

@csrf_exempt
def criar_lembrete(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            movimentacao = data.get('movimentacao')
            mensagem = data.get('mensagem')

            lembrete = controlador_lembrete.criar_lembrete(movimentacao, mensagem)
            return JsonResponse({
                "message": "Lembrete criado com sucesso",
                "lembrete": {
                    "movimentacao": lembrete.movimentacao,
                    "mensagem": lembrete.mensagem
                }
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_lembrete(request, movimentacao):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            mensagem = data.get('mensagem')

            lembrete = controlador_lembrete.atualizar_lembrete(movimentacao, mensagem)
            if lembrete:
                return JsonResponse({
                    "message": "Lembrete atualizado com sucesso",
                    "lembrete": {
                        "movimentacao": lembrete.movimentacao,
                        "mensagem": lembrete.mensagem
                    }
                })
            else:
                return JsonResponse({"error": "Lembrete não encontrado"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_lembrete(request, movimentacao):
    if request.method == "DELETE":
        lembrete = controlador_lembrete.deletar_lembrete(movimentacao)
        if lembrete:
            return JsonResponse({"success": "Lembrete deletado com sucesso"})
        else:
            return JsonResponse({"error": "Lembrete não encontrado"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_lembrete_por_movimentacao(request, movimentacao):
    if request.method == "GET":
        lembrete = controlador_lembrete.buscar_lembrete_por_movimentacao(movimentacao)
        if lembrete:
            return JsonResponse({
                "movimentacao": lembrete.movimentacao,
                "mensagem": lembrete.mensagem
            })
        else:
            return JsonResponse({"error": "Lembrete não encontrado"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_lembretes(request):
    if request.method == "GET":
        lembretes = controlador_lembrete.buscar_lembretes()
        lembretes_data = [{"movimentacao": l.movimentacao, "mensagem": l.mensagem} for l in lembretes]
        return JsonResponse(lembretes_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)
