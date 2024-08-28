import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.movimentacao_controller import ControladorMovimentacao

controlador_movimentacao = ControladorMovimentacao()

@csrf_exempt
def criar_movimentacao(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            categoria = data.get('categoria')
            orcamento = data.get('orcamento')
            tipo = data.get('tipo')
            valor = data.get('valor')
            data_movimentacao = data.get('data')
            quer_ser_lembrado = data.get('quer_ser_lembrado', False)
            recorrente = data.get('recorrente', False)

            movimentacao = controlador_movimentacao.criar_movimentacao(
                nome, categoria, orcamento, tipo, valor, data_movimentacao, quer_ser_lembrado, recorrente
            )
            return JsonResponse({
                "message": "Movimentação criada com sucesso",
                "movimentacao": {
                    "id": movimentacao.id,
                    "nome": movimentacao.nome,
                    "categoria": movimentacao.categoria,
                    "orcamento": movimentacao.orcamento,
                    "tipo": movimentacao.tipo,
                    "valor": movimentacao.valor,
                    "data": movimentacao.created_at,
                    "quer_ser_lembrado": movimentacao.quer_ser_lembrado,
                    "recorrente": movimentacao.recorrente
                }
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_movimentacao(request, movimentacao_id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            categoria = data.get('categoria')
            tipo = data.get('tipo')
            valor = data.get('valor')
            quer_ser_lembrado = data.get('quer_ser_lembrado', False)
            recorrente = data.get('recorrente', False)

            movimentacao = controlador_movimentacao.atualizar_movimentacao(
                movimentacao_id, nome, categoria, tipo, valor, quer_ser_lembrado, recorrente
            )
            if movimentacao:
                return JsonResponse({
                    "message": "Movimentação atualizada com sucesso",
                    "movimentacao": {
                        "id": movimentacao.id,
                        "nome": movimentacao.nome,
                        "categoria": movimentacao.categoria,
                        "orcamento": movimentacao.orcamento_id,
                        "tipo": movimentacao.tipo,
                        "valor": movimentacao.valor,
                        "quer_ser_lembrado": movimentacao.quer_ser_lembrado,
                        "recorrente": movimentacao.recorrente,
                        "created_at": movimentacao.created_at,
                        "updated_at": movimentacao.updated_at
                    }
                })
            else:
                return JsonResponse({"error": "Movimentação não encontrada"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_movimentacao(request, id):
    if request.method == "DELETE":
        movimentacao = controlador_movimentacao.deletar_movimentacao(id)
        if movimentacao:
            return JsonResponse({"message": "Movimentação deletada com sucesso"})
        else:
            return JsonResponse({"error": "Movimentação não encontrada"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def buscar_movimentacoes(request):
    if request.method == "GET":
        movimentacoes = controlador_movimentacao.buscar_movimentacoes()
        movimentacoes_data = [
            {
                "id": m.id,
                "nome": m.nome,
                "categoria": m.categoria,
                "orcamento": m.orcamento.id,
                "tipo": m.tipo,
                "valor": m.valor,
                "data": m.created_at,
                "quer_ser_lembrado": m.quer_ser_lembrado,
                "recorrente": m.recorrente
            } for m in movimentacoes
        ]
        return JsonResponse(movimentacoes_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_movimentacao_tipo(request, tipo):
    if request.method == "GET":
        movimentacoes = controlador_movimentacao.buscar_movimentacao_tipo(tipo)
        movimentacoes_data = [
            {
                "id": m.id,
                "nome": m.nome,
                "categoria": m.categoria,
                "orcamento": m.orcamento.id,
                "tipo": m.tipo,
                "valor": m.valor,
                "data": m.created_at,
                "quer_ser_lembrado": m.quer_ser_lembrado,
                "recorrente": m.recorrente
            } for m in movimentacoes
        ]
        return JsonResponse(movimentacoes_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_movimentacao_categoria(request, categoria):
    if request.method == "GET":
        movimentacoes = controlador_movimentacao.buscar_movimentacao_categoria(categoria)
        movimentacoes_data = [
            {
                "id": m.id,
                "nome": m.nome,
                "categoria": m.categoria,
                "orcamento": m.orcamento.id,
                "tipo": m.tipo,
                "valor": m.valor,
                "data": m.created_at,
                "quer_ser_lembrado": m.quer_ser_lembrado,
                "recorrente": m.recorrente
            } for m in movimentacoes
        ]
        return JsonResponse(movimentacoes_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_movimentacao_recorrente(request, recorrente):
    if request.method == "GET":
        movimentacoes = controlador_movimentacao.buscar_movimentacao_recorrente(recorrente)
        movimentacoes_data = [
            {
                "id": m.id,
                "nome": m.nome,
                "categoria": m.categoria,
                "orcamento": m.orcamento.id,
                "tipo": m.tipo,
                "valor": m.valor,
                "data": m.created_at,
                "quer_ser_lembrado": m.quer_ser_lembrado,
                "recorrente": m.recorrente
            } for m in movimentacoes
        ]
        return JsonResponse(movimentacoes_data, safe=False)

    return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_movimentacao_orcamento_id(request, orcamento_id):
    if request.method == "GET":
        movimentacoes = controlador_movimentacao.buscar_movimentacao_orcamento_id(orcamento_id)
        if movimentacoes:
            movimentacoes_data = [
                {
                    "id": m.id,
                    "nome": m.nome,
                    "categoria": m.categoria,
                    "orcamento": m.orcamento.id,  # assumindo que orcamento é uma FK e tem um ID
                    "tipo": m.tipo,
                    "valor": m.valor,
                    "data": m.created_at,
                    "quer_ser_lembrado": m.quer_ser_lembrado,
                    "recorrente": m.recorrente
                } for m in movimentacoes
            ]
            return JsonResponse(movimentacoes_data, safe=False, status=200)
        else:
            return JsonResponse({"error": "Nenhuma movimentação encontrada para o orçamento especificado"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def registrar_gasto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            categoria = data.get('categoria')
            user_id = data.get('user_id')
            valor = data.get('valor')
            quer_ser_lembrado = data.get('quer_ser_lembrado', False)
            recorrente = data.get('recorrente', False)
            mensagem = data.get('mensagem', " ")

            movimentacao = controlador_movimentacao.registrar_gasto(
                nome=nome,
                categoria=categoria,
                user_id=user_id,
                valor=valor,
                quer_ser_lembrado=quer_ser_lembrado,
                recorrente=recorrente,
                mensagem=mensagem
            )

            return JsonResponse({
                "message": "Gasto registrado com sucesso",
                "movimentacao": {
                    "id": movimentacao.id,
                    "nome": movimentacao.nome,
                    "categoria": movimentacao.categoria,
                    "valor": str(movimentacao.valor),
                    "tipo": movimentacao.tipo,
                    "mensagem": movimentacao.mensagem
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def registrar_entrada(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            categoria = data.get('categoria')
            user_id = data.get('user_id')
            valor = data.get('valor')
            quer_ser_lembrado = data.get('quer_ser_lembrado', False)
            recorrente = data.get('recorrente', False)
            mensagem = data.get('mensagem', " ")

            movimentacao = controlador_movimentacao.registrar_entrada(
                nome=nome,
                categoria=categoria,
                user_id=user_id,
                valor=valor,
                quer_ser_lembrado=quer_ser_lembrado,
                recorrente=recorrente,
                mensagem=mensagem
            )

            return JsonResponse({
                "message": "Entrada registrada com sucesso",
                "movimentacao": {
                    "id": movimentacao.id,
                    "nome": movimentacao.nome,
                    "categoria": movimentacao.categoria,
                    "valor": str(movimentacao.valor),
                    "tipo": movimentacao.tipo,
                    "mensagem": movimentacao.mensagem
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)
