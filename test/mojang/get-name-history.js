const test = require('ava')
const nock = require('nock')
const {getNameHistory} = require('../..')

test('resolves with a valid profile id', async t => {
  // observed 20.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/user/profiles/0d252b7218b648bfb86c2ae476954d32/names')
    .reply(200, [
      {
        name: 'previous'
      }, {
        name: 'username',
        changedToAt: 1503271972505
      }
    ])

  const names = await getNameHistory('0d252b7218b648bfb86c2ae476954d32')
  t.is(names.length, 2)
})

test('rejects with an invalid profile id', async t => {
  // observed 20.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/user/profiles/7125ba8b1c864508b92bb5c042ccfe2b/names')
    .reply(204)

  const err = await t.throws(getNameHistory('7125ba8b1c864508b92bb5c042ccfe2b'))
  t.is(err.message, 'no such profile: 7125ba8b1c864508b92bb5c042ccfe2b')
})
