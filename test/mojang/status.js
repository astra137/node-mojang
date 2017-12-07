const test = require('ava')
const nock = require('nock')
const {status} = require('../..')

test('resolves with cleaned array', async t => {
  // Behavior observed 22.08.2017 by maccelerated
  nock('https://status.mojang.com')
    .get('/check')
    .reply(200, [
      {
        'minecraft.net': 'green'
      },
      {
        'session.minecraft.net': 'yellow'
      },
      {
        'account.mojang.com': 'red'
      },
      {
        'auth.mojang.com': 'green'
      },
      {
        'skins.minecraft.net': 'green'
      },
      {
        'authserver.mojang.com': 'green'
      },
      {
        'sessionserver.mojang.com': 'green'
      },
      {
        'api.mojang.com': 'green'
      },
      {
        'textures.minecraft.net': 'green'
      },
      {
        'mojang.com': 'green'
      }
    ])

  const list = await status()
  t.true(list instanceof Array)
  t.is(list.length, 10)

  const webStatus = list.find(s => s.hostname === 'minecraft.net')
  t.is(webStatus.color, 'green')
  t.true(webStatus.isAvailable)
  t.false(webStatus.hasIssues)

  const sessionStatus = list.find(s => s.hostname === 'session.minecraft.net')
  t.is(sessionStatus.color, 'yellow')
  t.true(sessionStatus.isAvailable)
  t.true(sessionStatus.hasIssues)

  const accountStatus = list.find(s => s.hostname === 'account.mojang.com')
  t.is(accountStatus.color, 'red')
  t.false(accountStatus.isAvailable)
  t.true(accountStatus.hasIssues)
})
