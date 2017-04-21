import _ from 'lodash'
import l from 'chalk-log'

import cocos from '../cocos'
import leaves from '../leaves'

import pkg from '../../package.json'

export default class Palm {
	constructor (params) {
		this.cocos = cocos
		this.leaf = params.talk

		if (this.leaf === 'telegram') {
			this.telegram = new leaves.Telegram(params.telegram)
		} else if (this.leaf === 'cli') {
			this.cli = new leaves.Cli()
		} else if (this.leaf === 'rocketchat') {
			this.rocketchat = new leaves.RocketChat(params.rocketchat)
		}
	}

	listen () {
		l.note(`Initialized palm v${pkg.version} via ${this.leaf}`)

		this[this.leaf].init()

		this[this.leaf].on('message', text => {
			this.respond({ text })
		})
	}

	send ({ text }) {
		this[this.leaf].send({ text })
	}

	respond ({ text }) {
		const getCoco = this.initCoco(text)

		if (getCoco.ok) {
			getCoco.coco.exec(text, this[this.leaf])
				.then(text => this.send({ text }))
				.catch(err => l.error(err))
		} else {
			this.cocos.idk.exec()
				.then(text => this.send({ text }))
				.catch(err => l.error(err))
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

	addCoco (coco) {
		this.cocos[coco.name] = coco
	}
}
