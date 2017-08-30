const test = require('ava')
const nock = require('nock')
const {isSecure} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves true when access token is valid and IP is secure', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .get('/user/security/location')
    .reply(204)

  t.true(await isSecure('goodaccesstoken'))
})

// Observed using curl on a digital ocean droplet
// API behavior observed 29.08.2017 by maccelerated
test('resolves false when IP address is not secure', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer accesstoken`
    }
  })
    .get('/user/security/location')
    .reply(401, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'Current IP is not secured'
    })

  t.false(await isSecure('accesstoken'))
})

// Observed using curl on a digital ocean droplet
// API behavior observed 29.08.2017 by maccelerated
test('rejects if access token is bad', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer badaccesstoken`
    }
  })
    .get('/user/security/location')
    .reply(401, {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }, {
      'WWW-Authenticate': `Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"`
    })

  const err = await t.throws(isSecure('badaccesstoken'))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'invalid_token')
})
