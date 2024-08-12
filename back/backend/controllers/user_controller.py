from backend.repositories.user_repository import RepositorioUsuario

class ControladorUsuario:
    def __init__(self):
        self.repositorio_usuarios = RepositorioUsuario()

    def criar_usuario(self, nome, login, senha):
        if not all([nome, login, senha]):
            raise ValueError("Todos os campos são obrigatórios")
        return self.repositorio_usuarios.criar_usuario(nome, login, senha)

    def buscar_usuario_por_id(self, id):
        return self.repositorio_usuarios.buscar_usuario_por_id(id)

    def atualizar_usuario(self, id, nome=None, login=None, senha=None):
        return self.repositorio_usuarios.atualizar_usuario(id, nome, login, senha)

    def deletar_usuario(self, id):
        return self.repositorio_usuarios.deletar_usuario(id)
    
    def buscar_usuarios(self):
        return self.repositorio_usuarios.buscar_usuarios()