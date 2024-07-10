## Node version

```bash
  Node 20.10.0
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# docker run
$ docker compose up -d

# install package
$ yarn install

# migration
$ yarn db:migrate

# seed
$ yarn db:seed

# dev mode
$ yarn dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Structure

```bash
/scripts
/src
├── /config
│   ├── env
│   ├── i18n
│   ├── validator
├── /constants
├── /controllers
├── /language
│   ├── en
│   ├── vi
├── /middlewares
│   ├── authMiddleware.js
│   ├── baseMiddleware.js
│   ├── paginationMiddleware.js
├── /models
├── /routes
├── /sequelize
│   ├── config
│   ├── migrations
│   ├── models
│   ├── seeders
│   ├── index.ts
├── /services
├── /types
├── /utils
│   ├── errors
│   ├── jwt
│   ├── logger
├── /validation
├── index.ts
```

## 
## Stay in touch

- Author - [Stable Bui](https://github.com/vungbt)

## License

Nest is [MIT licensed](LICENSE).
