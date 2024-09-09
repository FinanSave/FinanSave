import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.controllers.relatorio_controller import ControladorRelatorio

controlador_relatorio = ControladorRelatorio()

@csrf_exempt
def criar_dashboard(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            mes = data.get('mes')

            controlador_relatorio.criar_dashboard(user_id, mes)
            return JsonResponse({
                "message": "Relatorio criado com sucesso"
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método não permitido"}, status=405)

