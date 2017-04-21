import l from 'chalk-log'
import { EventEmitter } from 'events'

import axe from '../../lib/axe'

export default class RocketChat extends EventEmitter {
	constructor (params) {
		super(params)

		this.authOk = false
		this.headers = {}

		this.axe = {}

		this._preInit(params)
	}

	init () {
		setInterval(() => {
			if (this.authOk) {
				// ***** Example request *****
				// const data = {
				// 	channel: '#bot_test',
				// 	text: 'Test 2'
				// }
				// this.axe.post('/chat.postMessage', data, { headers: this.headers })
				// 	.then(res => {
				// 		console.log(res.data)
				// 	})
				// 	.catch(err => l.error(err))
				// ***** End example *****
			}
		}, 3000)
	}

	_preInit (params) {
		// Check params
		if (this._checkParams(params)) {
			this.axe = axe({
				baseURL: params.url
			})

			// Authenticate user
			this._auth({ user: params.user, password: params.password })
				.then(auth => {
					if (auth.status === 'success') {
						l.ok('Authentication successfull.')
						this.headers = {
							'X-Auth-Token': auth.data.authToken,
							'X-User-Id': auth.data.userId
						}
						this.authOk = true
					} else {
						l.error('Authentication error.')
					}
				})
				.catch(err => l.error(err))
		}
	}

	_auth ({ user, password }) {
		return this.axe.post('/login', { user, password })
			.then(res => res.data)
			.catch(err => l.error(err))
	}

	_checkParams (params) {
    // TODO: add check here
		return true
	}
}
