export default {
  enabled: true,
  name: 'current_time',
  details: 'What time is it?',
  keywords: [
    'time',
    'what time',
    'hours'
  ],
  exec () {
    return new Date()
  }
}
