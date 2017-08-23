const test = require('ava')
const nock = require('nock')
const sessionProfile = require('../lib/session-profile')

test('resolves with a profile session with a valid id', async t => {
  // behavior observed 22.08.2017 by maccelerated
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/47c49720c9ee42009ef05e1c4cd2760c')
    .reply(200, {
      'id': '47c49720c9ee42009ef05e1c4cd2760c',
      'name': 'MoVo99',
      'properties': [{
        'name': 'textures',
        'value': 'eyJ0aW1lc3RhbXAiOjE1MDM0NDkzODI5MzIsInByb2ZpbGVJZCI6IjQ3YzQ5NzIwYzllZTQyMDA5ZWYwNWUxYzRjZDI3NjBjIiwicHJvZmlsZU5hbWUiOiJNb1ZvOTkiLCJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjRhNmE0OWZlMDVkNTNiNjc2OWM0Mzc5MTc2ZTkxMmI2ODk0MmU5Y2VmMzQyYTg2Njg0NmQyMWY3YWNlOWUyNCJ9fX0='
      }]
    })

  const profile = await sessionProfile('47c49720c9ee42009ef05e1c4cd2760c')
  t.is(profile.name, 'MoVo99')
})

test('rejects with an invalid id', async t => {
  // behavior observed 22.08.2017 by maccelerated
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/123')
    .reply(204)

  const err = await t.throws(sessionProfile('123'))
  t.is(err.message, 'Profile does not exist')
})
