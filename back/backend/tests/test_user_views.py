import json
import pytest
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient
from backend.models import Usuario

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_cadastrar_user(api_client):
    url = reverse('cadastrar_usuario')
    data = {
        'nome': 'testuser',
        'login': 'testuser',
        'email': 'testuser@example.com',
        'senha': 'testpassword',
    }
    response = api_client.post(url, data, format='json')
    print(response.status_code)
    print(json.loads(response.content))
    assert response.status_code == status.HTTP_201_CREATED
    print(Usuario.objects.all())
    assert Usuario.objects.count() == 1
    assert Usuario.objects.get().login == 'testuser'

@pytest.mark.django_db
def test_atualizar_usuario(api_client):
    usuario = Usuario.objects.create(nome='testuser', login='testuser', email='testuser@example.com', senha='testpassword')
    url = reverse('atualizar_usuario', kwargs={'id': usuario.id})
    data = {
        'nome': 'updateduser',
        'login': 'testuser',
        'email': 'testuser_updated@example.com',
        'senha': 'newpassword',
    }
    response = api_client.put(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    usuario.refresh_from_db()
    assert usuario.nome == 'updateduser'
    assert usuario.email == 'testuser_updated@example.com'
    
@pytest.mark.django_db
def test_deletar_usuario(api_client):
    usuario = Usuario.objects.create(nome='testuser', login='testuser', email='testuser@example.com', senha='testpassword')
    url = reverse('deletar_usuario', kwargs={'id': usuario.id})
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_200_OK
    assert Usuario.objects.count() == 0

@pytest.mark.django_db
def test_buscar_usuario_por_id(api_client):
    usuario = Usuario.objects.create(nome='testuser', login='testuser', email='testuser@example.com', senha='testpassword')
    url = reverse('buscar_usuario_por_id', kwargs={'id': usuario.id})
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    data = json.loads(response.content)
    assert data['login'] == 'testuser'

@pytest.mark.django_db
def test_buscar_usuarios(api_client):
    Usuario.objects.create(nome='testuser1', login='testuser1', email='testuser1@example.com', senha='testpassword')
    Usuario.objects.create(nome='testuser2', login='testuser2', email='testuser2@example.com', senha='testpassword')
    url = reverse('buscar_usuarios')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    data = json.loads(response.content)
    assert len(data) == 2

@pytest.mark.django_db
def test_login(api_client):
    Usuario.objects.create(
        nome='testuser',
        login='testuser',
        email='testuser@example.com',
        senha=make_password('testpassword')  # Certifique-se de que a senha está criptografada
    )
    url = reverse('login_usuario')  # Verifique o nome correto da URL
    data = {
        'login': 'testuser',
        'senha': 'testpassword',
    }
    response = api_client.post(url, data, format='json')
    print(response.status_code)
    print(json.loads(response.content))
    assert response.status_code == status.HTTP_200_OK
    data = json.loads(response.content)
    assert 'token' in data
    assert isinstance(data['token'], str)  # Verifica se o token é uma string

