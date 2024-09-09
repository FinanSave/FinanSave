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
from .views.user_views import cadastrar_usuario, atualizar_usuario, buscar_usuario_por_id, deletar_usuario, buscar_usuarios, login
from .views.orcamento_views import criar_orcamento, buscar_orcamentos, atualizar_orcamento, deletar_orcamento, buscar_orcamento_por_user_id, buscar_saldo, buscar_orcamento_por_orcamento_id
from .views.movimentacao_view import registrar_gasto, registrar_entrada, buscar_movimentacoes, deletar_movimentacao, buscar_movimentacao_orcamento_id, buscar_movimentacao_tipo, atualizar_movimentacao, buscar_movimentacao_recorrente, buscar_movimentacao_categoria
from .views.relatorio_view import criar_dashboard

urlpatterns = [
  # http://localhost:8000/user/cadastrar/
  path('user/cadastrar/', cadastrar_usuario, name='cadastrar_usuario'),
  path('user/buscar/', buscar_usuarios, name='buscar_usuarios'),
  path('user/buscar/<int:id>/', buscar_usuario_por_id, name='buscar_usuario_por_id'),
  path('user/atualizar/<int:id>/', atualizar_usuario, name='atualizar_usuario'),
  path('user/deletar/<int:id>/', deletar_usuario, name='deletar_usuario'),
  path('login/', login, name='login_usuario'),
  path('orcamento/criar/', criar_orcamento, name='criar_orcamento'),
  path('orcamento/buscar/', buscar_orcamentos, name='buscar_orcamentos'),
  path('orcamento/atualizar/<int:user_id>/', atualizar_orcamento, name='atualizar_orcamento'),
  path('orcamento/deletar/<int:user_id>/', deletar_orcamento, name='deletar_orcamento'),
  path('orcamento/buscar/<int:user_id>/', buscar_orcamento_por_user_id, name='buscar_orcamento_por_user_id'),
  path('orcamento/buscar-id/<int:id>/', buscar_orcamento_por_orcamento_id, name='buscar_orcamento_por_orcamento_id'),
  path('orcamento/buscar-saldo/<int:user_id>/', buscar_saldo, name='buscar_saldo'),
  path('movimentacao/buscar/', buscar_movimentacoes, name='buscar_movimentacoes'),
  path('movimentacao/criar/gasto/', registrar_gasto, name='registrar_gasto'),
  path('movimentacao/criar/entrada/', registrar_entrada, name='registrar_entrada'),
  path('movimentacao/buscar/orcamento-id/<int:orcamento_id>/', buscar_movimentacao_orcamento_id, name='buscar_movimentacao_orcamento_id'),
  path('movimentacao/buscar/tipo/<str:tipo>/', buscar_movimentacao_tipo, name='buscar_movimentacao_tipo'),
  path('movimentacao/buscar/categoria/<str:categoria>/', buscar_movimentacao_categoria, name='buscar_movimentacao_categoria'),
  path('movimentacao/buscar/recorrente/<str:recorrente>/', buscar_movimentacao_recorrente, name='buscar_movimentacao_recorrente'),
  path('movimentacao/deletar/<int:id>/', deletar_movimentacao, name='deletar_movimentacao'),
  path('movimentacao/atualizar/<int:movimentacao_id>/', atualizar_movimentacao, name='atualizar_movimentacao'),
  path('movimentacao/atualizar/<int:movimentacao_id>/', atualizar_movimentacao, name='atualizar_movimentacao'),
  path('relatorio/criar/', criar_dashboard, name='criar_dashboard'),
  ]
