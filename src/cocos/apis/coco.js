const phrases = [
	'api'
]

export default {
	enabled: true,
	name: 'apis',
	details: 'Get api info by keyword',
	keywords: phrases,
	exec () {
		return 'This is an API coco!'
	}
}
