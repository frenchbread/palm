import chalk from 'chalk'

const ok = chalk.green
const err = chalk.red
const info = chalk.blue
const warn = chalk.yellow

const colors = {
	ok,
	err,
	info,
	warn
}

export default {
	ok (text) {
		this._print('ok', text)
	},
	err (text) {
		this._print('err', text)
	},
	info (text) {
		this._print('info', text)
	},
	warn (text) {
		this._print('warn', text)
	},
	_print (color, text) {
		console.log(colors[color](` ${text} `))
	}
}
