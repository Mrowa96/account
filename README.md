# Account

## Requirements

- Node.js >= 14

## How to setup dev environment?

- Copy `.env.dist` to `.env` and replace all envs ended with PLACEHOLDER suffix
- Run `npm i`
- Run `npm run start`

## Information for developers

- In scripts you should import modules by `import xxx from @/xxx`. `@` is resolving to `src` directory.
- In styles you should import styles by `@import 'xxx.scss';`. It will resolve to `src/styles` directory.
- When `NODE_ENV` will be equal to `development` only one favicon will be generated - for better performance.
- You could disable type checking on dev build for better performance by setting `BUILD_DISABLE_TYPE_CHECK_IN_DEV_ENV` to `1` in `.env` file.
