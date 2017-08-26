const test = require('ava')
const nock = require('nock')
const getUserInfo = require('../../src/mojang/get-user-info')

test('wraps api error on bad access token', async t => {
  // bahavior observed 22.08.2017 by maccelerated
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer badormissing'
    }
  })
    .get('/user')
    .reply(401, {
      error: 'UnauthorizedOperationException',
      errorMessage: 'User not authenticated'
    })

  const err = await t.throws(getUserInfo('badormissing'))
  t.is(err.name, 'UnauthorizedOperationException')
  t.is(err.message, 'User not authenticated')
})

test('resolves with a valid access token', async t => {
  // bahavior observed 22.08.2017 by maccelerated
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
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

  const info = await getUserInfo('goodaccesstoken')
  t.truthy(info.username)
})
