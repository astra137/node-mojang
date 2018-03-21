const test = require('ava')
const nock = require('nock')
const {signout} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('resolves with valid credentials', async t => {
  nock('https://authserver.mojang.com')
    .post('/signout', {
      username: 'valid@user.com',
      password: 'password'
    })
    .reply(204)

  const username = 'valid@user.com'
  const password = 'password'
  await signout({username, password})
  t.pass()
})

// API behavior observed 17.08.2017 by maccelerated
test('rejects with invalid credentials', async t => {
  nock('https://authserver.mojang.com')
    .post('/signout', {
      username: 'invalid@user.com',
      password: 'password'
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Invalid username or password.'
    })

  const username = 'invalid@user.com'
  const password = 'password'
  const err = await t.throws(signout({username, password}))
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.response.status, 403)
})
