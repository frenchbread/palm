export const start = {
  name: 'default',
  keywords: [],
  run () {
    return 'I don\'t understand what you mean, sir!';
  }
}

export const greet = {
  name: 'greet',
  keywords: [
    'hi',
    'hello'
  ],
  run () {
    return 'Hello';
  }
}

export const buy = {
  name: 'buy',
  keywords: [
    'buy'
  ],
  run () {
    return 'Buy';
  }
}

export const time = {
  name: 'time',
  keywords: [
    'what time is it'
  ],
  run () {
    return new Date();
  }
}
