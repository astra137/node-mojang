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

  const username = 'user@domain.tld'
  const password = 'user secret'
  const session = await authenticate({username, password})
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

  const username = 'user@domain.tld'
  const password = 'incorrect secret'
  const err = await t.throws(authenticate({username, password}))
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.response.status, 403)
})

// API behavior spoofed, based on http://wiki.vg/Authentication#Errors
test('rejects with cause if account is migrated', async t => {
  nock('https://authserver.mojang.com')
    .post('/authenticate', {
      username: 'username',
      password: 'other secret',
      requestUser: true
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Account migrated, use e-mail as username.',
      cause: 'UserMigratedException'
    })

  const username = 'username'
  const password = 'other secret'
  const err = await t.throws(authenticate({username, password}))
  t.is(err.message, 'Invalid credentials. Account migrated, use e-mail as username.')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.cause, 'UserMigratedException')
  t.is(err.response.status, 403)
})

// API behavior observed 20.03.2018 by maccelerated
test('rejects if username and password are missing', async t => {
  nock('https://authserver.mojang.com')
    .post('/authenticate', {
      requestUser: true
    })
    .reply(400, {
      error: 'IllegalArgumentException',
      errorMessage: 'message is null'
    })

  const err = await t.throws(authenticate({}))
  t.is(err.message, 'message is null')
  t.is(err.name, 'IllegalArgumentException')
  t.is(err.response.status, 400)
})
