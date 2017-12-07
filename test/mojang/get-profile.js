const test = require('ava')
const nock = require('nock')
const {getProfile} = require('../..')

// API behavior observed 1.12.2017 by maccelerated
test('resolves with a valid profile id', async t => {
  nock('https://api.mojang.com')
    .get('/user/profile/7125ba8b1c864508b92bb5c042ccfe2b')
    .reply(200, {'id': '7125ba8b1c864508b92bb5c042ccfe2b', 'name': 'KrisJelbring'})

  const {name} = await getProfile('7125ba8b1c864508b92bb5c042ccfe2b')
  t.is(name, 'KrisJelbring')
})

// API behavior observed 1.12.2017 by maccelerated
test('rejects when profile id does not exist', async t => {
  nock('https://api.mojang.com')
    .get('/user/profile/7125ba8b1c864508b92bb5c042ccfe2c')
    .reply(204)

  const err = await t.throws(getProfile('7125ba8b1c864508b92bb5c042ccfe2c'))
  t.is(err.message, 'no such profile: 7125ba8b1c864508b92bb5c042ccfe2c')
})
