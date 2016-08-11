import { EventEmitter } from 'events';

import config from '../config';
import got from 'got';
import _ from 'lodash';

export class Palm extends EventEmitter {

  constructor (params) {
    super(params);
    this._host = params.host;
    this._token = params.token;
    this._recipient = null;
    this._offset = 0;
  }

  listen () {
    console.log('Listening for updates ..');
    setInterval(() => {
      this._getUpdates();
    }, 3000);
  }

  send () {
    // TODO; send method
  }

  _getUpdates () {

    const url = this._host + this._token + '/getUpdates?offset=' + this._offset;

    got(url)
      .then(response => {
        return JSON.parse(response.body);
      })
      .then(bodyJSON => {

        if (bodyJSON.ok) {
          return bodyJSON.result;
        } else {
          console.error('Reponse is not OK');
        }
      })
      .then(messages => {

        if (messages.length > 0) {

          this._updateOffset(messages);
          _.forEach(messages, message => this.emit('message', message));
        }

      })
      .catch(error => {
        console.error(error);
      });
  }

  _updateOffset (messages) {

    let arr = [];

    _.forEach(messages, (message) => {
        arr.push(message.update_id);
    });

    this._offset = Math.max.apply(null, arr) + 1;
  }
}
