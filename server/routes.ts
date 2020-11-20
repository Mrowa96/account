import loginHandler from '@server/handlers/loginHandler';
import { RouteType } from '@server/types';

const routes: RouteType[] = [
  {
    method: 'POST',
    url: '/login',
    handler: loginHandler,
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
  },
];

export default routes;
