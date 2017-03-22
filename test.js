const Palm = require('./').default

// const telegram = require('./config').telegram

// const palm = new Palm({ talk: 'telegram', telegram })

const palm = new Palm({ talk: 'cli' })

palm.listen()
