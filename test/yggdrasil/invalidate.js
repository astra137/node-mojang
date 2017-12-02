const test = require('ava')
const nock = require('nock')
const {invalidate} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('resolves with valid tokens', async t => {
  nock('https://authserver.mojang.com')
    .post('/invalidate', {
      accessToken: 'valid',
      clientToken: 'whatever' // clientToken is optional but must match
    })
    .reply(204)

  const accessToken = 'valid'
  const clientToken = 'whatever'
  await invalidate({accessToken, clientToken})
  t.pass()
})

// API behavior observed 17.08.2017 by maccelerated
test('should also resolve with invalid tokens', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  nock('https://authserver.mojang.com')
    .post('/invalidate', {
      accessToken: 'invalid',
      clientToken: 'whatever'
    })
    .reply(204)

  const accessToken = 'invalid'
  const clientToken = 'whatever'
  await invalidate({accessToken, clientToken})
  t.pass()
})
