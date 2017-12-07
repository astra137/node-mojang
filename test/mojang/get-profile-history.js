const test = require('ava')
const nock = require('nock')
const {getProfileHistory} = require('../..')

// The profile id is actually KrisJelbring's :P
// API behavior observed 30.08.2017 by maccelerated
test('resolves with a valid profile id', async t => {
  nock('https://api.mojang.com')
    .get('/user/profiles/7125ba8b1c864508b92bb5c042ccfe2b/names')
    .reply(200, [
      {
        'name': 'Gold'
      },
      {
        'name': 'Diamond',
        'changedToAt': 1414059749000
      }
    ])

  const names = await getProfileHistory('7125ba8b1c864508b92bb5c042ccfe2b')
  t.is(names.length, 2)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects when profile id does not exist', async t => {
  nock('https://api.mojang.com')
    .get('/user/profiles/0d252b7218b648bfb86c2ae476954d32/names')
    .reply(204)

  const err = await t.throws(getProfileHistory('0d252b7218b648bfb86c2ae476954d32'))
  t.is(err.message, 'no such profile: 0d252b7218b648bfb86c2ae476954d32')
})
