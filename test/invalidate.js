const test = require('ava')
const nock = require('nock')
const invalidate = require('../lib/invalidate')

test('resolves with valid tokens', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  // clientToken is optional but must match
  nock('https://authserver.mojang.com')
    .post('/invalidate', {
      accessToken: 'valid',
      clientToken: 'whatever'
    })
    .reply(204)

  await invalidate('valid', 'whatever')
  t.pass()
})

test('should also resolve with invalid tokens', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  nock('https://authserver.mojang.com')
    .post('/invalidate', {
      accessToken: 'invalid',
      clientToken: 'whatever'
    })
    .reply(204)

  await invalidate('invalid', 'whatever')
  t.pass()
})
