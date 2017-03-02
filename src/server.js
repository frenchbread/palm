import Palm from './core'
import config from '../config'

const palm = new Palm({
  telegram: config.telegram
})

// palm.on('message', message => {
//   // palm.respond(message)
//   console.log('Got message')
// })

palm.listen()

export default palm
