import readline from 'readline'
import { EventEmitter } from 'events'

import log from '../../lib/log'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

export default class Cli extends EventEmitter {
	init () {
		this.get()
	}

	get () {
		rl.question('> ', message => {
			this.emit('message', message)
		})
	}

	send ({ text, level }) {
		// if (!l[level]) {
		// 	l.ok(text)
		// } else {
		// 	l[level](text)
		// }

		log.ok(text)
		this.get()
	}
}
