# Twintalk -- Chat API (Backend)

Este é o backend da aplicação **Twintalk**, um chatbot simples com
histórico por usuário, desenvolvido como parte de um desafio técnico.\
A API é construída com **Python 3.14+, Django e Django REST Framework**,
e utiliza **SQLite** como banco de dados padrão.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   **Python 3.14+**
-   **Django 5+**
-   **Django REST Framework**
-   **SQLite**
-   Ambiente virtual (**venv**)

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    _core/              # Configurações principais do Django
        settings.py
        urls.py
        asgi.py
        wsgi.py

    chat/               # App responsável pelo chat
        models.py
        serializers.py
        views.py

    db.sqlite3          # Banco de dados SQLite
    manage.py           # Utilitário administrativo do Django

------------------------------------------------------------------------

## ⚙️ Configuração e Execução do Projeto

### 1. Criar ambiente virtual

No Windows + Git Bash:

``` bash
python -m venv venv
source venv/Scripts/activate
```

### 2. Instalar dependências

``` bash
python -m pip install django djangorestframework
```

### 3. Realizar migrações

``` bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Rodar o servidor

``` bash
python manage.py runserver
```

API disponível em:

    http://127.0.0.1:8000/

------------------------------------------------------------------------

## 📌 Endpoints Disponíveis

### 🔹 **POST /messages/**

Envia uma mensagem e recebe a resposta mockada.

**Request:**

``` json
{
  "user": "A",
  "text": "Olá!"
}
```

**Response:**

``` json
{
  "id": 1,
  "user": "A",
  "text": "Olá!",
  "response": "Obrigado por sua mensagem, Usuário A. Em breve retornaremos.",
  "created_at": "2025-11-21T18:42:01Z"
}
```

------------------------------------------------------------------------

### 🔹 **GET /messages/?user=A**

Retorna o histórico de mensagens filtrado por usuário.

**Exemplo:**

    GET /messages/?user=A

**Resposta:**

``` json
[
  {
    "id": 1,
    "user": "A",
    "text": "Olá!",
    "response": "Obrigado por sua mensagem, Usuário A. Em breve retornaremos.",
    "created_at": "2025-11-21T18:42:01Z"
  }
]
```

------------------------------------------------------------------------

## 🧠 Modelagem

### **Model: Message**

Local: `chat/models.py`

``` python
class Message(models.Model):
    USER_CHOICES = (('A', 'Usuário A'), ('B', 'Usuário B'))

    user = models.CharField(max_length=1, choices=USER_CHOICES)
    text = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

Cada mensagem enviada é persistida e vinculada ao usuário A ou B.

------------------------------------------------------------------------

## 🔧 Decisões Técnicas

-   **Separação por app ("chat")**\
    Mantém o código organizado e modular.

-   **Uso do Django REST Framework**\
    Facilita a criação de APIs REST, serialização e validação.

-   **Respostas mockadas no backend**\
    Atende ao requisito do desafio sem necessidade de algoritmos
    complexos.

-   **Histórico filtrado por query param (?user=A)**\
    Simples, performático e direto ao objetivo.

------------------------------------------------------------------------

## 🧪 Testando a API

Você pode usar:

-   Postman\
-   Insomnia\
-   Thunder Client (VSCode)\
-   Ou o frontend em React

------------------------------------------------------------------------

## 📄 Licença

Projeto desenvolvido para fins de avaliação técnica.
