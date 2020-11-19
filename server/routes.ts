import loginHandler from './handlers/loginHandler';
import { RouteType } from './types/route';

const routes: RouteType[] = [
  {
    method: 'POST',
    url: '/login',
    handler: loginHandler,
    options: {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
          },
        },
      },
    },
  },
];

export default routes;
