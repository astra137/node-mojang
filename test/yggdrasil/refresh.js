const test = require('ava')
const nock = require('nock')
const {refresh} = require('../..')

// API behavior observed 17.08.2017 by maccelerated
test('returns a new access and client token', async t => {
  const accessToken = 'oldvalid'
  const clientToken = 'client'

  nock('https://authserver.mojang.com')
    .post('/refresh', {
      accessToken,
      clientToken,
      requestUser: true
    })
    .reply(200, {
      accessToken: 'newvalid',
      clientToken,
      selectedProfile: {
        id: 'profile identifier',
        name: 'player name'
      },
      user: {
        id: 'user identifier',
        properties: []
      }
    })

  const nextSession = await refresh({accessToken, clientToken})
  t.is(nextSession.accessToken, 'newvalid')
  t.is(nextSession.clientToken, 'client')
  t.truthy(nextSession.selectedProfile)
  t.truthy(nextSession.user)
})

// API behavior observed 17.08.2017 by maccelerated
test('rejects with invalid tokens', async t => {
  const accessToken = 'invalid'
  const clientToken = 'client'

  nock('https://authserver.mojang.com')
    .post('/refresh', {
      accessToken,
      clientToken,
      requestUser: true
    })
    .reply(403, {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid token'
    })

  const err = await t.throws(refresh({accessToken, clientToken}))
  t.is(err.message, 'Invalid token')
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.response.status, 403)
})
