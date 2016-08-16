import { Palm } from './core';
import config from './config';

const palm = new Palm(config.telegram);

palm.on('message', (message) => {
  palm.respond(message);
  console.log('Got message');
});

palm.listen();