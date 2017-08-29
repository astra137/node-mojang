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

test.todo('rejects when access token is bad')
test.todo('rejects when IP address is not secure')
