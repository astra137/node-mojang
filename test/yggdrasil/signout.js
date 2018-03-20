const test = require('ava')
const nock = require('nock')
const {signout} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('resolves with valid credentials', async t => {
  const username = 'valid@user.com'
  const password = 'password1'

  nock('https://authserver.mojang.com')
    .post('/signout', {
      username,
      password
    })
    .reply(204)

  await signout({username, password})
  t.pass()
})

// API behavior observed 17.08.2017 by maccelerated
test('rejects with invalid credentials', async t => {
  const username = 'invalid@user.com'
  const password = 'password2'

  nock('https://authserver.mojang.com')
    .post('/signout', {
      username,
      password
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Invalid username or password.'
    })

  const err = await t.throws(signout({username, password}))
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.response.status, 403)
})
