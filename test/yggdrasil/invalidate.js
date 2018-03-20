const test = require('ava')
const nock = require('nock')
const {invalidate} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('resolves with valid tokens', async t => {
  const accessToken = 'valid'
  const clientToken = 'whatever'

  nock('https://authserver.mojang.com')
    .post('/invalidate', {accessToken, clientToken})
    .reply(204)

  await invalidate({accessToken, clientToken})
  t.pass()
})

// API behavior observed 17.08.2017 by maccelerated
test('should also resolve with invalid tokens', async t => {
  const accessToken = 'invalid'
  const clientToken = 'whatever2'

  nock('https://authserver.mojang.com')
    .post('/invalidate', {accessToken, clientToken})
    .reply(204)

  await invalidate({accessToken, clientToken})
  t.pass()
})
