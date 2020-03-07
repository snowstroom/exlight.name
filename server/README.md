# API сервер

## Общие сведения

Серверная часть проекта личного сайта-блога на [NodeJS](https://nodejs.org/en/). В проекте используется:

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [NodeMailer](https://nodemailer.com/about/)
- И другие библиотеки

Хранилище:

- PostgreSQL

## Структура проекта

`./dia` - диаграммы базы данных .dia

`./postman` - файлы коллекций Postman

`./scripts` - shell скрипты для запуска

`./src/classes` - js классы проекта

`./src/configs` - файлы конфигураций DotEnv (.env)

`./src/consts` - файлы констант проекта

`./src/controllers/*` - папки контроллеров сервера

`./src/guards` - сервисы проверки аутентификации

`./src/interfaces` - интерфейсы проекта

`./src/middleware` - midleware обработчики запросов NestJS

`./src/models` - классы моделей данных БД

`./src/services` - singleton сервисы проекта

`./src/templates` - шаблоны писем Handlebars (.hbs)

`./src/tools` - дополнительные функции

`./test` - интеграционные тесты

## DotEnv конфигурация проекта

```sh
# SERVER
EXPRESS_PORT # Server port
SERVER_DOMAIN # Domain name of API server
# CLIENT
CLIENT_DOMAIN # Domain name of client web application
# DB
POSTGRES_HOST # PostgreSQL database domain/ip
POSTGRES_USER # PostgreSQL database user name
POSTGRES_PASSWORD # PostgreSQL database user password
POSTRGES_DB # PosgreSQL database name
# Admin
APP_ADMIN_PASSWORD # Application admin password
APP_ADMIN_EMAIL # Aplplication admin email
# Token params
JWT_SECRET_KEY # Key for signature JWT Token
TOKEN_ALIVE_TIME # JWT token alive time (sec)
# Mail
SMTP_USER # SMTP user for send emails
SMTP_PASSOWRD # SMTP user password
# APPLICATION SETTING
DEFAULT_USER_ROLE_NAME # Role for new user
```

## API

Все URI функций API соответсвуют шаблону `/api/<version>/<entity>/<:id | list?params | item/<for>/<:id | list?params>>`, где:

`version` - версия API, например v1, v2, v3

`entity` - сущность в системе

`:id` - уникальный идентификатор сущности

`list` - параметр для получения списка, используется соместно с параметрами запроса `start`, `limit` и другими

`item` - параметр указыващий на то что сущность принадлежит другой сущности. Используется с `<for>`

`for` - указывает к какой сущности относится параметр `item`

Методы HTTP соответсвуют следующим действиям с сущностями:

`GET` - получить экземпляр сущноси или список

`POST` - создать экземпляр сущности

`PUT` - обновить экземпляр сущности

`DELETE` - удалить экземпляр сущности
