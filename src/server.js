import intel from 'intel';
import { Palm } from './core';
import config from './config';

const palm = new Palm(config.telegram);

palm.on('message', (message) => {
  palm.respond(message);
  intel.info('Got message');
});

palm.listen();
