<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center"> Single Jokee API - Interview Test Junior NodeJS Developer </p>
    <p align="center">

## Description

This app will display a single joke for the user to read. After reading the joke, the user will like or dislike the joke. The app will record the vote in database and then show another joke for the user to read. When there is no more jokes to show, the app will display a "That's all the jokes for today! Come back another day!" message.

There is no need to display the result of the votes. User should not see the same joke twice. User do not need to register or login to view the joke or vote for the joke.

_Technical Note_
App will use cookie to track if a user has voted for a joke. It is okay if the user clears his cookie and votes again.

## Technology

- Framework: NestJS
- Language: Typescript
- Database/ORM: MongoDB/Mongoose

## Installation

```bash
$ npm install
```

## Seeding

To seed jokes, run the following command

```bash
$ npm run seed
```

or

```bash
$ npm run seed:refresh
```

## Running the app

Before starting app, make sure you have created .env following .env.example

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

API Documentation: localhost:3000/document

**NOTE**: Swagger does not support Cookie when sending, but server can set cookie, thank about that so we don't need to worry about it. Just use Swagger normally!!!

## Stay in touch

- Author - [Đoàn Văn Đắc](https://www.linkedin.com/in/dac-doan-van-969586220/)

## License

Nest is [MIT licensed](LICENSE).
