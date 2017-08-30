const test = require('ava')
const nock = require('nock')
const {resetSkin} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves when access token, profile', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .delete(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`)
    .reply(204)

  await resetSkin('goodaccesstoken', '7ddf32e17a6ac5ce04a8ecbf782ca509')
  t.pass()
})

// This is prevented by using the security location endpoint first.
// API behavior observed 28.08.2017 by maccelerated
test('rejects when IP is not secured', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .delete(`/user/profile/7ddf32e17a6ac5ce04a8ecbf782ca509/skin`)
    .reply(403, {
      'error': 'Forbidden',
      'errorMessage': 'Current IP not secured'
    })

  const err = await t.throws(resetSkin('goodaccesstoken', '7ddf32e17a6ac5ce04a8ecbf782ca509'))
  t.is(err.name, 'Forbidden')
  t.is(err.message, 'Current IP not secured')
})
