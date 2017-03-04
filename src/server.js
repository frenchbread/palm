const { Palm } = require('./core')
const config = require('../config')

const palm = new Palm({
  talk: 'cli',
  telegram: config.telegram
})

palm.listen()

export default palm
