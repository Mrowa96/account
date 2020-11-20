import createServer from '@server/createServer';
import Config from '@/consts/config';

const server = createServer();

server.listen(Config.app.api.port, '0.0.0.0', listenError => {
  if (listenError) {
    server.log.error(listenError.message);

    process.exit(2);
  }
});
