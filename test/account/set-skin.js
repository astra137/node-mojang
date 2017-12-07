const test = require('ava')
const nock = require('nock')
const {setSkin} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves when access token, profile, and URL are valid', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).post(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`, 'model=&url=urlOfPNG')
    .reply(204)

  await setSkin({accessToken}, '7ddf32e17a6ac5ce04a8ecbf782ca509', 'urlOfPNG')
  t.pass()
})

// API behavior observed 28.08.2017 by maccelerated
test('Optionally sends slim skin type when selected', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).post(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`, 'model=slim&url=urlOfPNG')
    .reply(204)

  await setSkin({accessToken}, '7ddf32e17a6ac5ce04a8ecbf782ca509', 'urlOfPNG', true)
  t.pass()
})

// API behavior observed 28.08.2017 by maccelerated
test('rejects when URL is bad', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).post(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`, 'model=&url=badURL')
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'Content is not an image'
    })

  const err = await t.throws(setSkin({accessToken}, '7ddf32e17a6ac5ce04a8ecbf782ca509', 'badURL'))
  t.is(err.name, 'IllegalArgumentException')
  t.is(err.message, 'Content is not an image')
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects when access token is bad', async t => {
  const accessToken = 'badaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).post(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`, 'model=&url=urlOfPNG')
    .reply(401, {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }, {
      'WWW-Authenticate': 'Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"'
    })

  const err = await t.throws(setSkin({accessToken}, '7ddf32e17a6ac5ce04a8ecbf782ca509', 'urlOfPNG'))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'Unauthorized')
})
