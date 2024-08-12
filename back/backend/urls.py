"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views.user_views import cadastrar_usuario, atualizar_usuario, buscar_usuario_por_id, deletar_usuario, buscar_usuarios

urlpatterns = [
  # http://localhost:8000/user/cadastrar/
  path('user/cadastrar/', cadastrar_usuario, name='cadastrar_usuario'),
  path('user/buscar/', buscar_usuarios, name='buscar_usuarios'),
  path('user/buscar/<int:id>/', buscar_usuario_por_id, name='buscar_usuario_por_id'),
  path('user/atualizar/<int:id>/', atualizar_usuario, name='atualizar_usuario'),
  path('user/deletar/<int:id>/', deletar_usuario, name='deletar_usuario'),
]
