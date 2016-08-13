export const start = {
  name: 'default',
  keywords: [],
  run () {
    console.log('Default module called!');
    return 'Default module called!';
  }
}

export const greet = {
  name: 'greet',
  keywords: [
    'hi',
    'hello'
  ],
  run () {
    console.log('Hello module is called');
    return 'Hello';
  }
}

export const buy = {
  name: 'buy',
  keywords: [
    'buy'
  ],
  run () {
    console.log('Buy module is called');
    return 'Buy';
  }
}
