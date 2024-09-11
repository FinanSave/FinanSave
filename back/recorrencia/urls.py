from django.urls import path
from . import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', views.home, name='home'),  # Adicione uma view para a raiz
    path('', RedirectView.as_view(url='/', permanent=False), name='redirect_to_home'),
    ]