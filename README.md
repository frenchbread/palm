# palm

> :palm_tree: A Tree, that can talk.

### Install

```
$ yarn add palm
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
2. NPM install - `yarn install`
3. Test - `yarn run test` (Modify `test.js` file)

##### Build

```
$ yarn run build
```

### API

##### new Palm(options)

Returns `palm` instance

###### options

`talk` (String) - talking option to be used by palm to receive/send messages. Currently supported: `cli`, `telegram` or `rocketchat`

**NOTE!** The second option is a config provided for specific "talking option". Use one of the following:

`cli` - none

`telegram` - (Object)

```
{
	url: '<api_url>',
	token: '<your_bot_token>',
	parent: '<your_telegram_id'
}
```

`rocketchat` - (Object)

```
{
	url: '<full_api_url>', => e.g. https://<host>/api/v1
	user: '<your_username>',
	password: '<your_password>'
}
```

#### Methods

##### palm.listen()

Fires a listener that listens and responds to messages

##### palm.addCoco(coco)

Add custom responder (called `coco`)

`coco` - (Object)

```js
const customCoco = {
	// Enabled flag - Boolean
	enabled: true,
	// Coco name - String
	name: 'Hi',
	// Coco description - String
	details: 'My custom coco',
	// Keywords that indicate that this coco will be used - Array
	keywords: ['hi', 'bye'],
	// Function to be executed when responding to message - Function
	exec (text) {
		let text2Send = ''

		if (text === 'hi') {
			text2Send = 'Hi, there.'
		} else if (text === 'bye') {
			text2Send = 'Ok, bye.'
		}

		return Promise.resolve(text2Send)
	}
}

palm.addCoco(customCoco)
```

##### palm.send(options)

Programmatic way to send a message.

###### options

`to` - (Number)

Telegram `userId` to send message to.

`text` - (String)

Message text to be sent.


### Author
- Damir Mustafin [@frenchbread](https://github.com/frenchbread)

### License

[MIT](https://github.com/frenchbread/palm/blob/master/LICENSE)
