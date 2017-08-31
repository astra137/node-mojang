const test = require('ava')
const nock = require('nock')
const {getBlockedServers} = require('../..')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with a list of sha1s', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/blockedservers')
    .reply(200, `6f2520f8bd70a718c568ab5274c56bdbbfc14ef4
c645d6c6430db3069abd291ec13afebdb320714b
8bf58811e6ebca16a01b842ff0c012db1171d7d6
`)

  const list = await getBlockedServers()
  t.is(list.length, 3)

  // test *.minetime.com?
  // test *.mineaqua.es?
  // test *.eulablows.host?
  // test something that isn't on the list?
})
