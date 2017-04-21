const phrases = [
	'hi',
	'hello',
	'hey',
	'what up',
	'what\'s up',
	'how is it going',
	'sup',
	'yo',
	'dog',
	'just chillax',
	'cool',
	'ok',
	'well',
	'fine',
	'wosup',
	'why'
]

export default {
	enabled: true,
	name: 'greet',
	details: 'Just some talk',
	keywords: phrases,
	exec () {
		return Promise.resolve(phrases[Math.floor(Math.random() * phrases.length)])
	}
}
