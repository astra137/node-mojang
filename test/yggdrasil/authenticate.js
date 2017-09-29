const test = require('ava')
const nock = require('nock')
const {authenticate} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('resolves with accessToken and clientToken', async t => {
  nock('https://authserver.mojang.com')
    .post('/authenticate', {
      username: 'user@domain.tld',
      password: 'user secret',
      requestUser: true
    })
    .reply(200, {
      accessToken: '64e594b461a8c348a81005a43bcbf00d',
      clientToken: 'ab1c5e7d2446675769c125ad494a290b'
    })

  const session = await authenticate('user@domain.tld', 'user secret')
  t.truthy(session.accessToken)
  t.truthy(session.clientToken)
})

// API behavior observed 17.08.2017 by maccelerated
test('rejects with API\'s error on invalid credentials', async t => {
  nock('https://authserver.mojang.com')
    .post('/authenticate', {
      username: 'user@domain.tld',
      password: 'incorrect secret',
      requestUser: true
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Invalid username or password.'
    })

  const err = await t.throws(authenticate('user@domain.tld', 'incorrect secret'))
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.statusCode, 403)
})
