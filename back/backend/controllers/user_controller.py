import re
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password
from backend.repositories.user_repository import RepositorioUsuario

class ControladorUsuario:
    def __init__(self):
        self.repositorio_usuarios = RepositorioUsuario()

    def criar_usuario(self, nome, login, email, senha):
        if not all([nome, login, email, senha]):
            raise ValueError("Todos os campos são obrigatórios")
        
        senha_hash = make_password(senha)    # Criptografa a senha
        return self.repositorio_usuarios.criar_usuario(nome, login, email, senha_hash)

    def buscar_usuarios(self):
        return self.repositorio_usuarios.buscar_usuarios()

    def buscar_usuario_por_id(self, id):
        return self.repositorio_usuarios.buscar_usuario_por_id(id)

    def atualizar_usuario(self, id, nome=None, login=None, email=None, senha=None):
        if senha:
            senha_hash = make_password(senha)    # Criptografa a senha, se for alterada
        else:
            senha_hash = None
            
        return self.repositorio_usuarios.atualizar_usuario(id, nome, login, email, senha_hash)

    def deletar_usuario(self, id):
        return self.repositorio_usuarios.deletar_usuario(id)
    
    def login_usuario(self, login, senha):
        # Se o login for um e-mail, busca o usuário por e-mail
        if re.match(r"[^@]+@[^@]+\.[^@]+", login):
            usuario = self.repositorio_usuarios.buscar_usuario_por_email(login)
        else:
            usuario = self.repositorio_usuarios.buscar_usuario_por_login(login) # Senão, busca o usuário por login

        if usuario and check_password(senha, usuario.senha):
            # Gerar o token JWT
            token = self.gerar_token(usuario)
            return token
        else:
            print("Usuário não encontrado ou senha inválida")
            return None
        
    def gerar_token(self, usuario):
        payload = {
            'id': usuario.id,
            'login': usuario.login,
            'exp': datetime.now() + timedelta(days=1)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token