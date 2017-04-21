import readline from 'readline'
import { EventEmitter } from 'events'
import l from 'chalk-log'

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
		if (!l[level]) {
			l.ok(text)
		} else {
			l[level](text)
		}
		this.get()
	}
}
