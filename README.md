# TwinTalk - Chatbot de Atendimento

Este projeto é um protótipo **Fullstack** de um sistema de chat com atendimento simulado, desenvolvido como parte do teste técnico para a **4blue**.

A aplicação permite que o utilizador alterne entre perfis, converse com um Bot que responde conforme o perfil selecionado e consulte um histórico de interações persistente e pesquisável.
___
## Tecnologias Utilizadas

O projeto utiliza as versões mais recentes e estáveis do ecossistema React e Django.

### Frontend (Client)

- **React 19** (Hooks, Custom Hooks)
- **TypeScript 5.9** (Tipagem estática rigorosa)
- **Vite 7** (Build tool e servidor de desenvolvimento rápido)
- **Sass (SCSS)** (Estilização modular com variáveis e mixins)
- **React Router 7** (Gerenciamento de rotas)
- **Context API** (Gerenciamento de estado global: Usuário e Tema)
- **React Icons** (Ícones vetoriais)

### Backend (Server)

- **Python 3.12+**
- **Django 5.x**
- **Django REST Framework (DRF)**
- **SQLite** (Banco de dados relacional)
- **CORS Headers** (Integração Cross-Origin)

## Funcionalidades

- **Login Mockado:** Simulação de autenticação para "Usuário A" e "Usuário B", com persistência de sessão via Context API.
- **Chat Interativo:** - Envio de mensagens com persistência imediata no banco de dados.
  - Respostas automáticas (Bot) geradas no backend diferenciadas por perfil.
  - Animações de entrada de mensagens (CSS Keyframes) e auto-scroll.
  - Input inteligente com redimensionamento automático (Auto-resize).
- **Histórico Inteligente:**
  - Listagem completa das interações do utilizador logado.
  - **Barra de Pesquisa:** Filtragem em tempo real (client-side) por conteúdo da pergunta ou resposta.
- **UX/UI:**
  - **Dark Mode:** Alternância de tema claro/escuro.
  - **Responsividade:** Sidebar adaptável para mobile (gaveta) e desktop.
  - **Feedback Visual:** Indicadores de carregamento (loading) e tratamento de erros de conexão.
___
## Como rodar o projeto localmente

Pré-requisitos: **Node.js**, **npm** e **Python** instalados.

### 1. Configurando o Backend (API)

1. Abra o terminal na pasta `server`:

2. Crie o ambiente virtual
```bash
python -m venv venv
```

3. Ative o ambiente virtual

Windows (Git Bash):
```bash
source venv/Scripts/activate
```
Windows (PowerShell):
```bash
.\venv\Scripts\activate
```
Linux/Mac:
```bash
source venv/bin/activate
```

4. Instale as dependências
```bash
python -m pip install django django-cors-headers djangorestframework
```

5. Execute as migrações do banco de dados
```bash
python manage.py migrate
```

6. Inicie o servidor
```bash
python manage.py runserver 
```
A API estará disponível em: `<http://127.0.0.1:8000>`

### 2. Configurando o Frontend (Web)
Abra um novo terminal na pasta raiz do frontend `<(onde está o package.json)>`:
1. Instale as dependências
```bash
npm install
```

2. Execute o projeto
```bash
npm run dev
```
Acesse a aplicação em: `<http://localhost:5173>` (ou a porta indicada no terminal)
___
### 3. Decisões Técnicas
- **Arquitetura do Frontend**
  - **React 19 & Vite 7:** Escolhidos pela performance superior e suporte às novas features do ecossistema React.

  - **Estado Global:** Utilizei a Context API em vez de Redux ou Zustand. A decisão baseou-se na natureza dos dados (Sessão e Tema), que não exigem atualizações granulares de alta frequência. Isso permitiu manter o projeto leve, utilizando apenas os recursos nativos do React 19.

  - **CSS Modules/SCSS:** A estilização foi feita manualmente com SCSS para demonstrar conhecimento em CSS puro, arquitetura BEM e responsividade, sem depender de bibliotecas de componentes pesadas.

- **Lógica do Backend**
  - **Modelagem:** A estrutura foi mantida simples com um modelo Message vinculado diretamente ao User (String), focando na entrega ágil do MVP solicitado e na performance de leitura.

  - **Processamento de Mensagem:** A lógica de resposta do bot foi inserida no método perform_create da MessageViewSet. Isso garante que a resposta seja gerada e salva atomicamente no servidor no momento exato do envio, mantendo a integridade dos dados. Como são apenas dois usuários, deixei uma mensagem mockada específica para cada um.

  - **Otimização de Busca:** No histórico, o backend entrega os dados brutos do usuário e o frontend realiza a filtragem (filter + includes). Como o volume de dados de um chat pessoal não é massivo, essa abordagem garante uma experiência de pesquisa instantânea ("instant search") sem sobrecarregar a API com requisições a cada tecla digitada e sem a necessidade de fazer uma paginação.
___
Desenvolvido para o desafio técnico da [4blue](https://4blue.com.br/).