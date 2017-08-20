const test = require('ava')
const nock = require('nock')
const signout = require('../lib/signout')

test('resolves with valid credentials', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  nock('https://authserver.mojang.com')
    .post('/signout', {
      username: 'valid@user.com',
      password: 'password'
    })
    .reply(204)

  await signout('valid@user.com', 'password')
  t.pass()
})

test('rejects with invalid credentials', async t => {
  // Behavior observed 17.08.2017 by maccelerated
  nock('https://authserver.mojang.com')
    .post('/signout', {
      username: 'invalid@user.com',
      password: 'password'
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Invalid username or password.'
    })

  const err = await t.throws(signout('invalid@user.com', 'password'))
  t.is(err.statusCode, 403)
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
})
