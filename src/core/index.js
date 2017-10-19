import _ from 'lodash'

import cocos from '../cocos'
import leaves from '../leaves'
import log from '../lib/log'

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
		log.info(`Initialized palm v${pkg.version} via ${this.leaf}`)

		this[this.leaf].init()

		this[this.leaf].on('message', text => {
			this.respond({ text })
		})
	}

	send ({ text }) {
		this[this.leaf].send({ text })
	}

	// sendPhoto ({ photo }) {
	// 	if (this[this.leaf].sendPhoto) {
	// 		this[this.leaf].sendPhoto({ photo })
	// 			.then(res => console.log(res))
	// 			.catch(err => console.error(err))
	// 	}
	// }

	respond ({ text }) {
		const getCoco = this.initCoco(text)

		if (getCoco.ok) {
			getCoco.coco.exec(text, this[this.leaf])
				.then(text => this.send({ text }))
				.catch(err => log.err(err.message))
		} else {
			this.cocos.idk.exec()
				.then(text => this.send({ text }))
				.catch(err => log.err(err.message))
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
