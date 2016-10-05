import { EventEmitter } from 'events';

import got from 'got';
import _ from 'lodash';
import intel from 'intel';

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
    intel.info('Listening for updates ..');
    setInterval(() => {
      this._getUpdates();
    }, 3000);
  }

  send (data) {
    const { to, text } = data;

    const url = `${this._host + this._token}/sendMessage?chat_id=${to}&text=${text}`;

    got(url)
      .then(response => intel.info('Message sent'))
      .catch(error => intel.error(error));
  }

  respond (message) {
    const to = this._parent; // message.chat.id;
    const text = message.text;

    const module = this._initModule(text);

    if (module.ok) {
      this.send({ to, text: module.run() });
    } else {
      this.send({ to, text: this.modules.start.run() });
    }
  }

  _initModule (text) {
    const a = {
      ok: false,
    };

    for (const key in this.modules) {
      _.forEach(this.modules[key].keywords, (keyword) => {
        if (text.match(new RegExp(keyword, 'i'))) {
          a.ok = true;
          a.run = this.modules[key].run;
        }
      });
    }

    return a;
  }

  _getUpdates () {
    const url = `${this._host + this._token}/getUpdates?offset=${this._offset}`;

    got(url)
      .then(response => JSON.parse(response.body))
      .then(bodyJSON => {
        if (bodyJSON.ok) {
          return bodyJSON.result;
        }
        intel.error('Reponse is not OK');
        return false;
      })
      .then((messages) => {
        if (messages.length > 0) {
          this._updateOffset(messages);
          _.forEach(messages, message => this.emit('message', message.message));
        }
      })
      .catch(error => {
        intel.error(error);
      });
  }

  _updateOffset (messages) {
    const arr = [];

    _.forEach(messages, (message) => {
      arr.push(message.update_id);
    });

    this._offset = Math.max.apply(null, arr) + 1;
  }
}
