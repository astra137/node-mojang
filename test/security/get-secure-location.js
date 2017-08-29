const test = require('ava')
const nock = require('nock')
const getSecureLocation = require('../../src/security/get-secure-location')

// API behavior observed 28.08.2017 by maccelerated
test('resolves when access token is valid and IP is secure', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .get('/user/security/location')
    .reply(204)

  const isSecure = await getSecureLocation('goodaccesstoken')
  t.true(isSecure)
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

  const err = await t.throws(getSecureLocation('badaccesstoken'))
  t.is(err.name, 'Unauthorized')
  t.is(err.message, 'The request requires user authentication')
})

// Observed using curl on a digital ocean droplet
// API behavior observed 29.08.2017 by maccelerated
test('rejects when IP address is not secure', async t => {
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

  const err = await t.throws(getSecureLocation('accesstoken'))
  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.message, 'Current IP is not secured')
})
