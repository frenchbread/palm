import { EventEmitter } from 'events';

import config from '../config';
import got from 'got';
import _ from 'lodash';
import str from 'string';

export class Palm extends EventEmitter {

  constructor (params) {
    super(params);
    this._host = params.host;
    this._token = params.token;
    this._parent = params.parent;
    this._recipient = null;
    this._offset = 0;
    this.modules = require('../modules');
  }

  listen () {
    console.log('Listening for updates ..');
    setInterval(() => {
      this._getUpdates();
    }, 3000);
  }

  send (data) {

    const { to, text } = data;

    const url = this._host + this._token + '/sendMessage?chat_id=' + to + '&text=' + text;

    got(url)
      .then(response => {
        console.log('Message sent');
      })
      .catch(error => {
        console.error(error);
      })
  }

  respond (message) {

    const to = this._parent; // message.chat.id;
    const text = message.text

    const module = this._initModule(text);

    if (module.ok) {
      this.send({ to, text: module.run() });
    } else {
      this.send({ to, text: this.modules['start'].run() });
    }
  }

  _initModule (text) {

    let a = {
      ok: false
    };

    for (let key in this.modules) {
      _.forEach(this.modules[key].keywords, (keyword) => {
        if (text.match(new RegExp(keyword, 'i'))) {
            a.ok = true;
            a.run = this.modules[key].run
        };
      });
    }

    return a;
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
          _.forEach(messages, message => this.emit('message', message.message));
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