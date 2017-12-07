const test = require('ava')
const nock = require('nock')
const {getUser} = require('../..')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with a valid access token', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user')
    .reply(200, {
      'id': '0123456789',
      'email': 'user@domain.tld',
      'firstName': 'First',
      'lastName': 'Last',
      'username': 'user@domain.tld',
      'registerIp': '8.8.8.8',
      'migratedFrom': 'minecraft.net',
      'migratedAt': 1503453184000,
      'registeredAt': 1503453184000,
      'passwordChangedAt': 1503453184000,
      'dateOfBirth': 1503453184000,
      'deleted': false,
      'blocked': false,
      'secured': true,
      'migrated': false,
      'emailVerified': true,
      'legacyUser': false,
      'verifiedByParent': false,
      'fullName': 'First Last',
      'fromMigratedUser': true,
      'hashed': false
    })

  const info = await getUser({accessToken})
  t.truthy(info.username)
})

// API behavior observed 30.08.2017 by maccelerated
test('wraps api error on bad access token', async t => {
  const accessToken = 'badormissing'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user')
    .reply(401, {
      error: 'UnauthorizedOperationException',
      errorMessage: 'User not authenticated'
    }, {
      'WWW-Authenticate': 'Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"'
    })

  const err = await t.throws(getUser({accessToken}))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'UnauthorizedOperationException')
})
