# 📚 ClassUP

Sistema educacional completo que permite às instituições de ensino gerenciar professores, alunos, atividades, presenças, avisos e histórico de salas, com notificações automáticas por e-mail.

## 🚀 Descrição do Projeto

ClassUP é uma aplicação web criada para escolas e faculdades gerenciarem turmas, atividades, avisos e presença. A plataforma permite:

- Autenticação de alunos e professores com diferenciação de permissões por função (role).
- Criação e gerenciamento de salas, atividades e avisos pelo professor.
- Confirmação de presença e visualização de colegas e avisos por parte dos alunos.
- Encerramento de semestre com arquivamento de dados e envio de notificações por e-mail.
- Histórico de salas encerradas acessível tanto por alunos quanto por professores.

## 🧱 Arquitetura do Projeto

- **Backend**: Java + Spring Boot
- **Frontend**: React + Tailwind CSS
- **Banco de Dados**: MySQL
- **Autenticação**: JWT
- **Envio de E-mails**: Spring Mail (SMTP Gmail)
- **Deploy**: Railway (backend + banco) e Netlify (frontend)

## 🔐 Funcionalidades

### 📌 Gerais
- Autenticação com diferenciação de usuário (aluno ou professor)
- Recuperação de senha com envio de código por e-mail

### 👨‍🏫 Professor
- Criar, visualizar, editar e excluir salas
- Criar, editar e excluir atividades e avisos
- Remover alunos da sala (com e-mail automático)
- Encerrar semestre (arquiva salas e notifica alunos)
- Visualizar histórico de salas encerradas
- Editar perfil, senha, e-mail e foto de perfil 

### Funcionalidades do Aluno
- Entrar em salas via código gerado pelo professor.
- Confirmar ou cancelar presença em atividades.
- Visualizar avisos e lista de colegas da turma.
- Acesso a histórico de salas anteriores.
- Edição de perfil com upload de foto, alteração de e-mail e senha.

## 🚢 Deploy

- Backend e Banco de Dados (MySQL) hospedados no [Railway](https://railway.app/).
- Frontend hospedado no [Netlify]([https://www.netlify.com/](https://classup-web.netlify.app/inicio)).

## 🛠️ Instalação Local

### Backend
```bash
git clone https://github.com/seu-usuario/classup-backend.git
cd classup-backend
mvn clean install
mvn spring-boot:run
```

Crie um banco de dados MySQL chamado `classup_db`. Edite o arquivo `application.properties` com suas configurações locais:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/classup_db
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.mail.username=seu_email@gmail.com
spring.mail.password=sua_senha_de_app
API_SECURITY_TOKEN_SECRET=segredo_super_secreto
```

### Frontend
```bash
git clone https://github.com/seu-usuario/classup-frontend.git
cd classup-frontend
npm install
npm run dev
```

## 🚢 Deploy

- 🔧 **Backend + Banco de Dados**: [Railway](https://railway.app)
- 🌐 **Frontend**: [Netlify](https://classup-web.netlify.app/inicio)

## 📡 Endpoints da API (principais)

### `/user`
- POST `/login`, `/logout`, `/enviar-email`, `/redefinir-senha`
- GET `/` (perfil)
- PUT `/email`, `/senha`

### `/professor/sala`
- GET `/`, `/{id}`, `/atividades/{id}/resumo`
- POST `/`, `/atividades`, `/avisos`, `/encerrar`
- PUT `/atividades/{id}`, `/avisos/{id}`
- DELETE `/atividades/{id}`, `/avisos/{id}`, `/aluno/{alunoId}`

### `/aluno/sala`
- POST `/entrar`
- GET `/detalhes`
- PUT `/atividades/{id}/confirmar`, `/atividades/{id}/cancelar`

### `/sala/historico`
- GET `/`, `/{id}`

## 👨‍💻 Autor
Desenvolvido por [Felipe de Paula](https://github.com/felipexxxxx)

---

💬 Dúvidas ou sugestões? Fique à vontade para abrir uma issue no repositório!
