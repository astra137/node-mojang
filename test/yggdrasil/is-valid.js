const test = require('ava')
const nock = require('nock')
const {isValid} = require('../..')

// clientToken is optional, but must match session
// API behavior observed 17.08.2017 by maccelerated
test('resolves true with a valid accessToken and clientToken', async t => {
  nock('https://authserver.mojang.com')
    .post('/validate', {
      accessToken: 'valid',
      clientToken: 'clientid'
    })
    .reply(204)

  const valid = await isValid('valid', 'clientid')
  t.true(valid)
})

// 1 test instead of 2 because server response is the same
// API behavior observed 17.08.2017 by maccelerated
test('resolves false with an invalid accessToken or clientToken', async t => {
  nock('https://authserver.mojang.com')
    .post('/validate', {
      accessToken: 'invalid',
      clientToken: 'orwrongclient'
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid token'
    })

  const valid = await isValid('invalid', 'orwrongclient')
  t.false(valid)
})
