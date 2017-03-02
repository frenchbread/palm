import _ from 'lodash'
import initAxe from './lib/initAxe'

export default class Telegram {

  constructor ({ url, token, parent }) {
    this.parent = parent
    this.axe = initAxe({ url, token })
    this._offset = 0
  }

  send ({ to, text }) {
    return this.axe.post(`/sendMessage?chat_id=${to}&text=${text}`)
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
