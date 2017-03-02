import { EventEmitter } from 'events'

import _ from 'lodash'

import cocos from '../cocos'
import leaves from '../leaves'

export default class Palm extends EventEmitter {

  constructor (params) {
    super(params)
    this.cocos = cocos
    this.telegram = new leaves.Telegram(params.telegram)
  }

  listen () {
    setInterval(() => {
      this.telegram.getNewMessages()
        .then(msgs => _.forEach(msgs, msg => {
          // this.emit('message', message.message)
          this.getMessage(msg.message)
        }))
        .catch(err => new Error(err))
    }, 3000)
  }

  getMessage ({ from, chat, date, text }) {
    this.respondToMessage({ text })
  }

  respondToMessage ({ text }) {
    const to = this.telegram.parent // message.chat.id;
    const getCoco = this.initCoco(text)

    if (getCoco.ok) {
      this.telegram.send({ to, text: getCoco.coco.exec(text) })
    } else {
      this.telegram.send({ to, text: this.cocos.idk.exec() })
    }
  }

  initCoco (text) {
    const a = { ok: false }

    for (const key in this.cocos) {
      _.forEach(this.cocos[key].keywords, keyword => {
        if (text.match(new RegExp(keyword, 'i'))) {
          a.ok = true
          a.coco = this.cocos[key]
        }
      })
    }

    return a
  }
}
