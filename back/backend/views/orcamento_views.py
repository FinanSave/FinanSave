import json
from django.http import JsonResponse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.orcamento_controller import ControladorOrcamento

controlador_orcamento = ControladorOrcamento()

@csrf_exempt
def criar_orcamento(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body)
      user_id = data.get('user_id')
      saldo = data.get('saldo')
      limite_gastos = data.get('limite_gastos')
      meta_economia = data.get('meta_economia')

      try:
        # Verifica se o usuário já possui um orçamento
        orcamento_existente = controlador_orcamento.buscar_orcamento_por_user_id(user_id)
        if orcamento_existente:
          return JsonResponse({"error": "Usuário já possui um orçamento."}, status=400)

        orcamento = controlador_orcamento.criar_orcamento(user_id, saldo, limite_gastos, meta_economia)
        return JsonResponse({
          "message": 'Orçamento criado com sucesso',
          "orcamento": {
              "id": orcamento.id,
              "user_id": orcamento.user_id,
              "saldo": orcamento.saldo,
              "limite_gastos": orcamento.limite_gastos,
              "meta_economia": orcamento.meta_economia
          }
        }, status=201)
      except IntegrityError as e:
        return JsonResponse({"error": "Erro inesperado ao criar orçamento."}, status=500)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def buscar_orcamentos(request):
  if request.method == "GET":
    orcamentos = controlador_orcamento.buscar_orcamentos()
    orcamentos_list = []
    for orcamento in orcamentos:
      orcamentos_list.append({
        "id": orcamento.id,
        "user_id": orcamento.user_id,
        "saldo": orcamento.saldo,
        "limite_gastos": orcamento.limite_gastos,
        "meta_economia": orcamento.meta_economia
      })
    return JsonResponse({"orcamentos": orcamentos_list}, safe=False)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_orcamento(request, user_id):
  if request.method == "PUT":
    try:
      data = json.loads(request.body)
      saldo = data.get('saldo')
      limite_gastos = data.get('limite_gastos')
      meta_economia = data.get('meta_economia')

      orcamento = controlador_orcamento.atualizar_orcamento(user_id, saldo, limite_gastos, meta_economia)
      if orcamento:
        return JsonResponse({
          "message": 'Orçamento atualizado com sucesso',
          "orcamento": {
            "id": orcamento.id,
            "user_id": orcamento.user_id,
            "saldo": orcamento.saldo,
            "limite_gastos": orcamento.limite_gastos,
            "meta_economia": orcamento.meta_economia
          }
        })
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_orcamento(request, user_id):
  if request.method == "DELETE":
    orcamento = controlador_orcamento.deletar_orcamento(user_id)
    if orcamento:
      return JsonResponse({"success": "Orçamento deletado com sucesso"})

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def buscar_orcamento_por_user_id(request, user_id):
  if request.method == "GET":
    orcamento = controlador_orcamento.buscar_orcamento_por_user_id(user_id)
    if orcamento:
      return JsonResponse({
        "id": orcamento.id,
        "user_id": orcamento.user_id,
        "saldo": orcamento.saldo,
        "limite_gastos": orcamento.limite_gastos,
        "meta_economia": orcamento.meta_economia
      })
    else:
      return JsonResponse({"error": "Orçamento não encontrado"}, status=404)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def buscar_saldo(request, user_id):
  if request.method == "GET":
    saldo = controlador_orcamento.ver_saldo(user_id)
    if saldo:
      return JsonResponse({"saldo": saldo})
    else:
      return JsonResponse({"error": "Orçamento não encontrado"}, status=404)
  return JsonResponse({"error": "Método não permitido"}, status=405)


@csrf_exempt
def buscar_orcamento_por_orcamento_id(request, id):
  if request.method == "GET":
    orcamento = controlador_orcamento.buscar_orcamento_por_orcamento_id(id)
    if orcamento:
      return JsonResponse({
        "id": orcamento.id,
        "user_id": orcamento.user_id,
        "saldo": orcamento.saldo,
        "limite_gastos": orcamento.limite_gastos,
        "meta_economia": orcamento.meta_economia
      })
    return JsonResponse({"error": "Orçamento não encontrado"}, status=404)

  return JsonResponse({"error": "Método não permitido"}, status=405)
