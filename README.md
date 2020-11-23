# Account

## Requirements

- Node.js >= 14

## How to setup dev environment?

- Copy `.env.dist` to `.env` and replace all envs ended with PLACEHOLDER suffix. Example:
  ```
    APP_URL=http://localhost:3000
    APP_API_URL=http://localhost:3001
    APP_API_PORT=3001
    DEV_DISABLE_TYPE_CHECK=1
    DEV_APP_PORT=3000
  ```
- Run `npm i`
- Run `npm start`

## Credentials for login form

- Email: hello@there.com
- Password: zaq1@WSX

## Production version

Production version is available on https://account.pawel-mrowiec.dev/

## TODO

- Update webpack and related dependencies, when [this](https://github.com/jantimon/html-webpack-plugin/issues/1501) will be resolved.
