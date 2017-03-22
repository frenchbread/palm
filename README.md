# palm

> :palm_tree: A Tree, that can talk.

### Install

```
$ npm i palm --save
```

### Usage

```js
import Palm from 'palm'

const palm = new Palm({
  // talking option used for communications (telegram or cli for now)
  talk: '<option>',
  // if telegram, pass credentials (no need for cli)
  telegram: {
    host: 'https://api.telegram.org/bot', // the default one
    token: '<token>', // your telegram API Bot token
    parent: '<telegram_id>' // your telegram ID to send messages to
  }
})

// Init listener
palm.listen()

// Send messages
// If using within telegram, palm will send message to `parent` id
// specified in settings
palm.send({ text: 'Hi' })
```

### Development

##### Setup

1. Clone - `git clone https://github.com/frenchbread/palm.git && cd palm`
2. NPM install - `npm i`
3. Test - `npm test` (Modify `test.js` file)


##### Build

```
$ npm run build
```

### Author
- Damir Mustafin [@frenchbread](https://github.com/frenchbread)

### License

[MIT](https://github.com/frenchbread/palm/blob/master/LICENSE)
