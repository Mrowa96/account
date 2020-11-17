import fastify from 'fastify';
import config from '@/consts/config';

const server = fastify({
  logger: true,
  disableRequestLogging: true,
});

server.route({
  method: 'POST',
  url: '/login',
  handler: async (_request, reply) => {
    reply
      .headers({
        'Access-Control-Allow-Origin': config.app.url,
      })
      .send({});
  },
});

server.listen(config.app.api.port, '0.0.0.0', listenError => {
  if (listenError) {
    server.log.error(listenError.message);

    process.exit(2);
  }
});
