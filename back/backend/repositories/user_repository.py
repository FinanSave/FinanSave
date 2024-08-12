# backend/repositories/user_repository.py
from backend.models.user_model import Usuario

class RepositorioUsuario:
    @staticmethod
    def criar_usuario(nome, login, senha):
      usuario = Usuario.objects.create(nome=nome, login=login, senha=senha)
      return usuario
    
    @staticmethod
    def buscar_usuarios():
      return Usuario.objects.all()

    @staticmethod
    def buscar_usuario_por_id(user_id):
      return Usuario.objects.filter(id=user_id).first()

    @staticmethod
    def atualizar_usuario(user_id, nome=None, login=None, senha=None):
      usuario = Usuario.objects.filter(id=user_id).first()
      if usuario:
        if nome:
          usuario.nome = nome
        if login:
          usuario.login = login
        if senha:
          usuario.senha = senha
        usuario.save()
      return usuario

    @staticmethod
    def deletar_usuario(user_id):
      usuario = Usuario.objects.filter(id=user_id).first()
      if usuario:
        usuario.delete()
        return usuario
      return None
