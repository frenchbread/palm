import Palm from './core'
import config from '../config'

const palm = new Palm({
  talk: 'cli',
  telegram: config.telegram
})

palm.listen()

export default palm
