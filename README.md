# FinanSave

## Configração do Ambiente de Desenvolvimento

### Frontend (Next.js)

1. Caso não tenha instalado, instale o Node.js (vem com o npm que será utilizado na execução):  
   a. Windows: [Download Node.js](https://nodejs.org/en/download/prebuilt-installer)  
   b. Linux: 
    ```
      # installs nvm (Node Version Manager)
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      # download and install Node.js
      nvm install 20
    ```

2. Navegue até a pasta do front
    ```
      cd front/
    ```

3. Instale as dependências do front:
    ```
      npm install
    ```

4. Rode o front no localhost:
    ```
      npm run dev
    ```

### Backend (Django)

1. Instale qualquer versão do Python 3.1X (10 ou 11) | [Download Python](https://www.python.org/downloads/)

2. Navegue até a pasta do back
    ```
      cd back/
    ```

3. Crie e ative o ambiente virtual:
    ```
      python -m venv venv
      source venv/bin/activate  # No Windows use `venv\Scripts\activate`
    ```

4. Instale as dependências dentro do ambiente virtual:
    ```
      pip install -r requirements.txt
    ```

5. Aplique as migrações do Banco de Dados:
    ```
      python manage.py makemigrations backend
      python manage.py migrate
    ```

6. Rode o servidor de desenvolvimento do Django:
    ```
      python manage.py runserver
    ```
