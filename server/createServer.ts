import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import routes from '@server/routes';
import Config from '@/consts/config';

export default function createServer(): FastifyInstance {
  const server = fastify({
    logger: true,
    disableRequestLogging: true,
  });

  server.register(fastifyCors, {
    origin: Config.app.url,
  });

  routes.forEach(({ method, url, options, handler }) =>
    server.route({
      method,
      url,
      config: options,
      handler,
    }),
  );

  return server;
}
