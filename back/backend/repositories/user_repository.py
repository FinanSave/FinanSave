# backend/repositories/user_repository.py
from backend.models.user_model import Usuario

class RepositorioUsuario:
    @staticmethod
    def criar_usuario(nome, login, email, senha):
      usuario = Usuario.objects.create(nome=nome, login=login, email=email, senha=senha)
      return usuario
    
    @staticmethod
    def buscar_usuarios():
      return Usuario.objects.all()

    @staticmethod
    def buscar_usuario_por_id(user_id):
      return Usuario.objects.filter(id=user_id).first()
    
    @staticmethod
    def buscar_usuario_por_login(login):
      return Usuario.objects.filter(login=login).first()
    
    @staticmethod
    def buscar_usuario_por_email(email):
      return Usuario.objects.filter(email=email).first()

    @staticmethod
    def atualizar_usuario(user_id, nome=None, login=None, email=None, senha=None):
      usuario = Usuario.objects.filter(id=user_id).first()
      if usuario:
        if nome:
          usuario.nome = nome
        if login:
          usuario.login = login
        if email:
          usuario.email = email
        if senha:
          usuario.senha = senha
        usuario.save()
      return usuario

    @staticmethod
    def deletar_usuario(user_id):
      usuario = Usuario.objects.filter(id=user_id).first()
      if usuario:
        usuario.delete()
        return f"Usuário {user_id} foi deletado com sucesso"
      return None
