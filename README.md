<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Financial Portfolio
Desafio Backend que simula uma carteira de transações.

# Aplicação Node
API HTTP em Node.js com TypeScript, NestJS, Prisma, Docker e PostgreSQL.

## Guia de desenvolvimento
Prerequisites:

-  caso não utilize docker é recomendado ter uma versao do node mais atual.
- `yarn` ou `npm` (para gerenciamento de dependências e execução de scripts)
- `docker` e `docker-compose` (para executar o servidor, banco de dados localmente de forma isolada e reproduzível)

### Backend:
Em primeiro lugar se faz necessário preencher as variáveis de ambiente do backend. Crie um arquivo .env na raíz do projeto (exemplo abaixo).

```
DATABASE_URL=
PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_SECRET=

```
Exemplo de DATABASE_URL:
```
DATABASE_URL="postgresql://postgres:postgres@db:5432/financialportfolio?schema=public"

```

Em seguida é so subir o container docker:
```
sudo docker compose up
```

Antes de testar qualquer endpoint rode o comando para executar as migrations:
```

docker exec financialportfolio_api npx prisma migrate dev
```

Caso queira ver os dados no Prisma cliente execute:
```

docker exec financialportfolio_api npx prisma studio
```

Sem o docker:

```
npm i
npm run start
yarn start
```

### Swager:

Documentação disponível em http://localhost:{PORTA}/api

### Testes:
Para rodar os testes feitos:

```
npm run test
```

Qualquer duvida só me chamar pelo linkedin

https://www.linkedin.com/in/gabriel-rodrigues-aaa352207/

