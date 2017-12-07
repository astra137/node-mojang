const test = require('ava')
const nock = require('nock')
const {getUserCapeData} = require('../..')

// TODO someone with a cape would need to test this
test.todo('resolves with something?')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with empty array if profile has no cape', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer noobaccesstoken'
    }
  })
    .get('/user/profile/feae7d8f11bb4de5814ef5b02e229c2c/cape')
    .reply(200, [])

  const accessToken = 'noobaccesstoken'
  const data = await getUserCapeData({accessToken}, 'feae7d8f11bb4de5814ef5b02e229c2c')
  t.is(data.length, 0)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects if profile and access token are from different accounts', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer wrongaccesstoken'
    }
  })
    .get('/user/profile/069a79f444e94726a5befca90e38aaf5/cape') // Notch's profile
    .reply(403, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'Invalid profile id or access token.'
    })

  const accessToken = 'wrongaccesstoken'
  const err = await t.throws(getUserCapeData({accessToken}, '069a79f444e94726a5befca90e38aaf5'))
  t.is(err.message, 'Invalid profile id or access token.')
  t.is(err.name, 'ForbiddenOperationException')
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects if access token is invalid', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer badaccesstoken'
    }
  })
    .get('/user/profile/notused/cape')
    .reply(401, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'Invalid profile id or access token.'
    }, {
      'WWW-Authenticate': 'Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"'
    })

  const accessToken = 'badaccesstoken'
  const err = await t.throws(getUserCapeData({accessToken}, 'notused'))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'ForbiddenOperationException')
})
