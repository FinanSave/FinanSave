import json
from django.http import JsonResponse
from backend.controllers.user_controller import ControladorUsuario
from django.views.decorators.csrf import csrf_exempt

controlador_usuario = ControladorUsuario()

@csrf_exempt
def cadastrar_usuario(request):
  if request.method == "POST":
    try:
      # Obtém o corpo da requisição e decodifica o JSON
      data = json.loads(request.body)
      nome = data.get('nome')
      login = data.get('login')
      email = data.get('email')
      senha = data.get('senha')

      try:
        usuario = controlador_usuario.criar_usuario(nome, login, email, senha)
        return JsonResponse({"id": usuario.id, "nome": usuario.nome, "login": usuario.login, "email": usuario.email, "senha": usuario.senha})
      except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def atualizar_usuario(request, id):
  if request.method == "PUT":
    try:
      data = json.loads(request.body)
      nome = data.get('nome')
      login = data.get('login')
      email = data.get('email')
      senha = data.get('senha')

      usuario = controlador_usuario.atualizar_usuario(id, nome, login, email, senha)
      if usuario:
        return JsonResponse({"id": usuario.id, "nome": usuario.nome, "login": usuario.login, "email": usuario.email})
      else:
        return JsonResponse({"error": "Usuário não encontrado"}, status=404)
    except json.JSONDecodeError:
      return JsonResponse({"error": "JSON inválido"}, status=400)

  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def deletar_usuario(request, id):
  if request.method == "DELETE":
    usuario = controlador_usuario.deletar_usuario(id)
    if usuario:
      return JsonResponse({"success": "Usuário deletado com sucesso"})
    else:
      return JsonResponse({"error": "Usuário não encontrado"}, status=404)

  return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_usuario_por_id(request, id):
  if request.method == "GET":
    usuario = controlador_usuario.buscar_usuario_por_id(id)
    if usuario:
      return JsonResponse({"id": usuario.id, "nome": usuario.nome, "login": usuario.login, "email": usuario.email})
    else:
      return JsonResponse({"error": "Usuário não encontrado"}, status=404)

  return JsonResponse({"error": "Método não permitido"}, status=405)

def buscar_usuarios(request):
  if request.method == "GET":
    usuarios = controlador_usuario.buscar_usuarios()
    usuarios_data = [
      {
        "id": usuario.id,
        "nome": usuario.nome,
        "login": usuario.login,
        "email": usuario.email
      } for usuario in usuarios
    ]
    return JsonResponse(usuarios_data, safe=False)
  return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt
def login(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body)
      login = data.get('login')
      senha = data.get('senha')

      token = controlador_usuario.login_usuario(login, senha)
      if token:
        return JsonResponse({"token": token})
      else:
        return JsonResponse({"error": "Login ou senha incorretos"}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

  return JsonResponse({"error": "Método não permitido"}, status=405)
