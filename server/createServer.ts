import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import routes from '@server/routes';
import Config from '@/consts/config';

export default function createServer(): FastifyInstance {
  const server = fastify({
    logger: process.env.NODE_ENV !== 'test',
    disableRequestLogging: true,
  });

  server.register(fastifyCors, {
    origin: Config.app.url,
  });

  routes.forEach(({ method, url, schema, handler }) =>
    server.route({
      method,
      url,
      schema,
      handler,
    }),
  );

  return server;
}
