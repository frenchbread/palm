import _ from 'lodash'
import { EventEmitter } from 'events'

import log from '../../lib/log'

// sendPhoto
// import FormData from 'form-data'
// import fs from 'fs'
// import concat from 'concat-stream'

import axe from '../../lib/axe'

export default class Telegram extends EventEmitter {
	constructor (params) {
		super(params)

		this.parent = ''
		this.axe = {}
		this._offset = 0

		if (this._checkParams(params)) {
			this.parent = params.parent
			this.axe = axe({
				baseURL: params.url + params.token
			})
		}
	}

	init () {
		setInterval(() => {
			this.getNewMessages()
				.then(msgs => _.forEach(msgs, msg => {
					this.emit('message', { to: msg.message.from.id, text: msg.message.text })
				}))
				.catch(err => log.err(err.message))
		}, 3000)
	}

	send ({ to, text }) {
		return this.axe.post(`/sendMessage?chat_id=${(to) ? to : this.parent}&text=${text}`)
      .then(res => res)
      .catch(err => err)
	}

	// sendPhoto ({ photo }) {
	// 	const promise = new Promise((resolve) => {
	// 		const fd = new FormData()
	// 		fd.append('photo', fs.createReadStream(photo))
	//
	// 		fd.pipe(concat({ encoding: 'buffer' }, data => resolve(data)))
	// 	})
	//
	// 	return promise
	// 		.then((data) => this.axe.post(`/sendPhoto&chat_id=${this.parent}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }))
	// }

	getNewMessages () {
		return this.axe.get(`/getUpdates?offset=${this._offset}`)
			.then(res => {
				if (res.data.ok) {
					const messages = res.data.result
					if (messages.length > 0) this._updateOffset(messages)
					return messages
				}
				return log.err('Telegram response is not ok.')
			})
			.catch(err => log.err(err.message))
	}

	_updateOffset (msgs) {
		const ids = _.map(msgs, msg => msg.update_id)

		this._offset = Math.max.apply(null, ids) + 1
	}

	_checkParams (params) {
		if (params) {
			if (params.url) {
				log.ok('Telegram <url> is ok.')
			} else {
				log.err('Telegram <url> parameter not found.')
			}

			if (params.token) {
				log.ok('Telegram <token> is ok.')
			} else {
				log.err('Telegram <token> parameter is not found.')
			}

			if (params.parent) {
				log.ok('Telegram <parent> is ok.')
			} else {
				log.err('Telegram <parent> parameter is not found.')
			}
			return true
		} else {
			log.error('Telegram params not found.')
			return false
		}
	}
}
