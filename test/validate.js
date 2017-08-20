const test = require('ava')
const nock = require('nock')
const validate = require('../lib/validate')

test('resolves with a valid accessToken and clientToken', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  // clientToken is optional, but must match session
  nock('https://authserver.mojang.com')
    .post('/validate', {
      accessToken: 'valid',
      clientToken: 'clientid'
    })
    .reply(204)

  await validate('valid', 'clientid')
  t.pass()
})

test('rejects with an invalid accessToken or clientToken', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  // 1 test instead of 2 because server response is the same
  nock('https://authserver.mojang.com')
    .post('/validate', {
      accessToken: 'invalid',
      clientToken: 'orwrongclient'
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid token'
    })

  const err = await t.throws(validate('invalid', 'orwrongclient'))
  t.is(err.statusCode, 403)
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.message, 'Invalid token')
})
