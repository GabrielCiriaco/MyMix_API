# MyMix: Seu Aplicativo de Gerenciamento Musical

Bem-vindo ao MyMix, o aplicativo ideal para todos os amantes de música. Com o MyMix, você tem uma plataforma poderosa e intuitiva para gerenciar suas músicas favoritas de forma prática e eficiente. No MyMix, você terá acesso às letras das suas músicas favoritas! O MyMix é o aplicativo perfeito para aqueles que não querem mais cantar no "embromation". Quer se destacar entre seus amigos e arrasar no karaokê de domingo, ou até mesmo garantir que não vai errar a letra no louvor da igreja? O MyMix permite que você tenha suas letras favoritas sempre à mão!

## Autores

Gabriel Ciriaco Fornitano, Bruno José Mancinelli Vercelli e Matheus Henrique Souza Araújo são os talentosos criadores por trás do MyMix. Estes três estudantes estão atualmente matriculados nos cursos de Ciência da Computação e Sistemas de Informação na Universidade Federal de Itajubá (UNIFEI), uma das instituições de ensino superior mais renomadas do Brasil.

- **Gabriel Ciriaco Fornitano**
  - Gabriel é um dedicado aluno de Ciência da Computação, conhecido por sua paixão por desenvolvimento de software. Idealizador do MyMix, é responsável pela conexão com a API Vagalume, que disponibiliza as letras das músicas.
  
- **Bruno José Mancinelli Vercelli**
  - Bruno é estudante de Ciência da Computação, com um forte interesse em arquitetura de software e gerenciamento de projetos. Responsável pelo frontend do projeto, sua expertise no desenvolvimento de aplicativos é fundamental para a incrível interface do MyMix.
  
- **Matheus Henrique Souza Araújo**
  - Matheus, aluno de Sistemas de Informação, traz uma combinação de habilidades técnicas e criativas. Ele se destaca pelo alto nível da arquitetura do backend, bem como pelo banco de dados, assegurando que o MyMix seja não apenas funcional, mas também muito bem estruturado.

Juntos, Gabriel, Bruno e Matheus combinaram suas habilidades complementares para criar o MyMix, um aplicativo que reflete o alto nível de competência técnica e inovação que a UNIFEI inspira em seus alunos.

### Repositório no GitHub

Acesse o repositório no GitHub: [MyMix_API](https://github.com/GabrielCiriaco/MyMix_API)

### Funcionalidades

- Criação de conta para acessar o aplicativo
- Login na aplicação
- Pesquisa da letra de músicas a partir do nome do artista e da música
- Favoritar suas letras favoritas
- Remover as letras que já não são mais relevantes

### Rotas

Para facilitar a visualização das rotas disponíveis na API do MyMix, nossa equipe preparou uma documentação detalhada utilizando o Swagger. Acesse o link abaixo para explorar todas as funcionalidades da API e entender como integrá-la em suas aplicações:

[Documentação Aqui](http://localhost:8080/docs)

### Pré-requisitos

- Node.js (versão 20 ou superior)
- yarn
- Git

### Bibliotecas Utilizadas

O MyMix utiliza várias bibliotecas para fornecer funcionalidades robustas e uma experiência de desenvolvimento eficiente. Abaixo está uma breve descrição de cada uma delas:

- **@elastic/ecs-morgan-format** (1.5.1): Um formato de logging compatível com ECS (Elastic Common Schema) para o Morgan, que é usado para registro de solicitações HTTP.
- **@elastic/ecs-winston-format** (1.5.0): Um formato de logging compatível com ECS para o Winston, que é utilizado para registros gerais da aplicação.
- **@prisma/client** (5.16.1): A biblioteca cliente para Prisma, um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados.
- **@types/express** (^4.17.21): Tipagens para o Express, fornecendo suporte a TypeScript para melhor desenvolvimento e depuração.
- **bcrypt** (5.1.1) & **bcryptjs** (2.4.3): Bibliotecas para hashing de senhas, adicionando uma camada de segurança ao armazenamento de senhas.
- **compression** (1.7.4): Middleware para compressão de respostas HTTP, melhorando a performance da aplicação.
- **cors** (^2.8.5): Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo que a API seja acessada de diferentes domínios.
- **eslint** (8.56.0): Ferramenta de linting para JavaScript e TypeScript, ajudando a manter um código consistente e livre de erros.
- **express** (^4.19.2): Framework de aplicativo web para Node.js, facilitando a criação de APIs e servidores web.
- **jsonwebtoken** (9.0.2): Biblioteca para criação e verificação de tokens JWT (JSON Web Tokens), utilizada para autenticação e autorização.
- **morgan** (1.10.0): Middleware para logging de solicitações HTTP, útil para monitoramento e depuração.
- **swagger-autogen** (2.23.7), **swagger-jsdoc** (6.2.8) & **swagger-ui-express** (5.0.0): Bibliotecas utilizadas para gerar e servir documentação da API de forma automática e interativa.
- **winston** (3.11.0): Biblioteca de logging com suporte a múltiplos transportes, permitindo flexibilidade na forma como os logs são armazenados e exibidos.
- **zod** (^3.23.8): Biblioteca de validação e parsing de esquemas, garantindo que os dados manipulados pela aplicação estejam no formato correto.

### Passo a passo para utilizar o projeto

1. Clone o repositório:
    ```sh
    git clone https://github.com/GabrielCiriaco/MyMix_API.git
    ```
2. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto com as configurações indicadas no `.env.example`.

3. Instale as dependências e construa o projeto:
    ```sh
    yarn --frozen-lockfile
    yarn build
    yarn start
    ```
4. Visualize o banco de dados no navegador (opcional):
    ```sh
    npx prisma studio
    ```
5. Acesse a documentação da API no navegador:
    Abra [http://localhost:8080/docs](http://localhost:8080/docs) para visualizar a documentação completa da API.