const test = require('ava')
const nock = require('nock')
const {isSecure} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves true when access token is valid and IP is secure', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user/security/location')
    .reply(204)

  t.true(await isSecure({accessToken}))
})

// Observed using curl on a digital ocean droplet
// API behavior observed 29.08.2017 by maccelerated
test('resolves false when IP address is not secure', async t => {
  const accessToken = 'accesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user/security/location')
    .reply(401, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'Current IP is not secured'
    })

  t.false(await isSecure({accessToken}))
})

// Observed using curl on a digital ocean droplet
// API behavior observed 29.08.2017 by maccelerated
test('rejects if access token is bad', async t => {
  const accessToken = 'badaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user/security/location')
    .reply(401, {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }, {
      'WWW-Authenticate': `Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"`
    })

  const err = await t.throws(isSecure({accessToken}))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'Unauthorized')
})
