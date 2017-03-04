import _ from 'lodash'
import l from 'chalk-log'
import { EventEmitter } from 'events'

import initAxe from './lib/initAxe'

export default class Telegram extends EventEmitter {

  constructor ({ url, token, parent }) {
    super({ url, token, parent })
    this.parent = parent
    this.axe = initAxe({ url, token })
    this._offset = 0
  }

  init () {
    setInterval(() => {
      l.note('tick')
      this.getNewMessages()
        .then(msgs => _.forEach(msgs, msg => {
          this.emit('message', msg.message.text)
        }))
        .catch(err => new Error(err))
    }, 3000)
  }

  send ({ text }) {
    return this.axe.post(`/sendMessage?chat_id=${this.parent}&text=${text}`)
      .then(res => res)
      .catch(err => err)
  }

  getNewMessages () {
    return this.axe.get(`/getUpdates?offset=${this._offset}`)
      .then(res => {
        if (res.data.ok) {
          const messages = res.data.result

          if (messages.length > 0) this._updateOffset(messages)

          return messages
        }

        return new Error('Telegram response is not ok.')
      })
      .catch(err => err)
  }

  _updateOffset (msgs) {
    const ids = _.map(msgs, msg => msg.update_id)

    this._offset = Math.max.apply(null, ids) + 1
  }
}
