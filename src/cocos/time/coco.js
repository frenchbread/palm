import moment from 'moment'

export default {
	enabled: true,
	name: 'current_time',
	details: 'What time is it?',
	keywords: [
		'time',
		'what time',
		'hours'
	],
	exec () {
		return `Current time is: ${moment().format('DD/MMM/YYYY HH:mm:ss')}`
	}
}
