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
/src
├── /config
│   ├── env
│   ├── validator
├── /controllers
├── /middlewares
│   ├── authMiddleware.js
│   ├── baseMiddleware.js
│   ├── paginationMiddleware.js
├── /models
├── /routes
├── /sequelize
│   ├── migrations
│   ├── index.ts
├── /services
├── /types
├── /utils
│   ├── errors
│   ├── jwt
│   ├── logger
├── /validation
├── index.js
```

## 
## Stay in touch

- Author - [Stable Bui](https://github.com/vungbt)

## License

Nest is [MIT licensed](LICENSE).
