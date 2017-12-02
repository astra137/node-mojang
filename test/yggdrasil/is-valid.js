const test = require('ava')
const nock = require('nock')
const {isValid} = require('../..')

// clientToken is optional, but must match session
// API behavior observed 17.08.2017 by maccelerated
test('resolves true with a valid accessToken and clientToken', async t => {
  const accessToken = 'valid'
  const clientToken = 'clientid'

  nock('https://authserver.mojang.com')
    .post('/validate', {accessToken, clientToken})
    .reply(204)

  const valid = await isValid({accessToken, clientToken})
  t.true(valid)
})

// 1 test instead of 2 because server response is the same
// API behavior observed 17.08.2017 by maccelerated
test('resolves false with an invalid accessToken or clientToken', async t => {
  const accessToken = 'invalid'
  const clientToken = 'orwrongclient'

  nock('https://authserver.mojang.com')
    .post('/validate', {accessToken, clientToken})
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid token'
    })

  const valid = await isValid({accessToken, clientToken})
  t.false(valid)
})

// API behavior observed 17.08.2017 by maccelerated
test('rejects with API error that is not about an invalid token', async t => {
  const accessToken = 'goodtoken'
  const clientToken = 'clientoken'

  nock('https://authserver.mojang.com')
    .post('/validate', {accessToken, clientToken})
    .reply(400, {
      error: 'FakeErrorException',
      errorMessage: 'Whoops'
    })

  const err = await t.throws(isValid({accessToken, clientToken}))
  t.is(err.message, 'Whoops')
  t.is(err.name, 'FakeErrorException')
})
