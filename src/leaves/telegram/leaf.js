import _ from 'lodash'
import l from 'chalk-log'
import { EventEmitter } from 'events'

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
					this.emit('message', msg.message.text)
				}))
				.catch(err => l.error(err))
		}, 3000)
	}

	send ({ text }) {
		return this.axe.post(`/sendMessage?chat_id=${this.parent}&text=${text}`)
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
				return l.error('Telegram response is not ok.')
			})
			.catch(err => l.error(err))
	}

	_updateOffset (msgs) {
		const ids = _.map(msgs, msg => msg.update_id)

		this._offset = Math.max.apply(null, ids) + 1
	}

	_checkParams (params) {
		if (params) {
			if (params.url) {
				l.ok('Telegram <url> is ok.')
			} else {
				l.error('Telegram <url> parameter not found.')
			}

			if (params.token) {
				l.ok('Telegram <token> is ok.')
			} else {
				l.error('Telegram <token> parameter is not found.')
			}

			if (params.parent) {
				l.ok('Telegram <parent> is ok.')
			} else {
				l.error('Telegram <parent> parameter is not found.')
			}
			return true
		} else {
			l.error('Telegram params not found.')
			return false
		}
	}
}
