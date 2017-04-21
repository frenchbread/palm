const Palm = require('./').default

// TELEGRAM example
// const telegram = require('./config').telegram
// const palm = new Palm({ talk: 'telegram', telegram })

// CLI example
// const palm = new Palm({ talk: 'cli' })

// ROCKETCHAT example
const rocketchat = require('./config').rocketchat
const palm = new Palm({ talk: 'rocketchat', rocketchat })

palm.listen()
