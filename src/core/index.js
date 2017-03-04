import _ from 'lodash'

import cocos from '../cocos'
import leaves from '../leaves'

export class Palm {

  constructor (params) {
    this.cocos = cocos
    this.leaf = params.talk

    if (this.leaf === 'talegram') {
      this.telegram = new leaves.Telegram(params.telegram)
    } else if (this.leaf === 'cli') {
      this.cli = new leaves.Cli()
    }
  }

  listen () {
    this[this.leaf].init()

    this[this.leaf].on('message', text => {
      this.respond({ text })
    })
  }

  respond ({ text }) {
    const getCoco = this.initCoco(text)

    if (getCoco.ok) {
      this[this.leaf].send({ text: getCoco.coco.exec(text) })
    } else {
      this[this.leaf].send({ text: this.cocos.idk.exec() })
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
