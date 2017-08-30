const test = require('ava')
const nock = require('nock')
const {getProfile} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves with decoded textures data', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/069a79f444e94726a5befca90e38aaf5')
    .reply(200, {
      'id': '069a79f444e94726a5befca90e38aaf5',
      'name': 'Notch',
      'properties': [{
        'name': 'textures',
        'value': 'eyJ0aW1lc3RhbXAiOjE1MDM5NjQ5NzA4NTQsInByb2ZpbGVJZCI6IjA2OWE3OWY0NDRlOTQ3MjZhNWJlZmNhOTBlMzhhYWY1IiwicHJvZmlsZU5hbWUiOiJOb3RjaCIsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9hMTE2ZTY5YTg0NWUyMjdmN2NhMWZkZGU4YzM1N2M4YzgyMWViZDRiYTYxOTM4MmVhNGExZjg3ZDRhZTk0In0sIkNBUEUiOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9lZWMzY2FiZmFlZWQ1ZGFmZTYxYzY1NDYyOTdlODUzYTU0N2MzOWVjMjM4ZDdjNDRiZjRlYjRhNDlkYzFmMmMwIn19fQ=='
      }]
    })

  const profile = await getProfile('069a79f444e94726a5befca90e38aaf5')
  t.is(profile.id, '069a79f444e94726a5befca90e38aaf5')
  t.is(profile.name, 'Notch')
  t.is(profile.timestamp, 1503964970854)
  t.is(profile.skin, 'http://textures.minecraft.net/texture/a116e69a845e227f7ca1fdde8c357c8c821ebd4ba619382ea4a1f87d4ae94')
  t.is(profile.cape, 'http://textures.minecraft.net/texture/eec3cabfaeed5dafe61c6546297e853a547c39ec238d7c44bf4eb4a49dc1f2c0')
  t.falsy(profile.isSlim)
})

// User is boring regular user and has no cape.
// API behavior observed 28.08.2017 by maccelerated
test('resolves with no cape if profile does not have one', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/47c49720c9ee42009ef05e1c4cd2760c')
    .reply(200, {
      'id': '47c49720c9ee42009ef05e1c4cd2760c',
      'name': 'MoVo99',
      'properties': [{
        'name': 'textures',
        'value': 'eyJ0aW1lc3RhbXAiOjE1MDM5NjU0MTE3ODQsInByb2ZpbGVJZCI6IjQ3YzQ5NzIwYzllZTQyMDA5ZWYwNWUxYzRjZDI3NjBjIiwicHJvZmlsZU5hbWUiOiJNb1ZvOTkiLCJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjRhNmE0OWZlMDVkNTNiNjc2OWM0Mzc5MTc2ZTkxMmI2ODk0MmU5Y2VmMzQyYTg2Njg0NmQyMWY3YWNlOWUyNCJ9fX0='
      }]
    })

  const profile = await getProfile('47c49720c9ee42009ef05e1c4cd2760c')
  t.truthy(profile.skin)
  t.falsy(profile.cape)
})

// User is using the slim skin version and metadata is on textures.SKIN
// API behavior observed 28.08.2017 by maccelerated
test('resolves with no cape if profile does not have one', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/47c49720c9ee42009ef05e1c4cd2760c')
    .reply(200, {
      'id': '47c49720c9ee42009ef05e1c4cd2760c',
      'name': 'MoVo99',
      'properties': [{
        'name': 'textures',
        'value': 'eyJ0aW1lc3RhbXAiOjE1MDM5NjU0MTE3ODQsInByb2ZpbGVJZCI6IjQ3YzQ5NzIwYzllZTQyMDA5ZWYwNWUxYzRjZDI3NjBjIiwicHJvZmlsZU5hbWUiOiJNb1ZvOTkiLCJ0ZXh0dXJlcyI6eyJTS0lOIjp7Im1ldGFkYXRhIjp7Im1vZGVsIjoic2xpbSJ9LCJ1cmwiOiJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzY0YTZhNDlmZTA1ZDUzYjY3NjljNDM3OTE3NmU5MTJiNjg5NDJlOWNlZjM0MmE4NjY4NDZkMjFmN2FjZTllMjQifX19'
      }]
    })

  const profile = await getProfile('47c49720c9ee42009ef05e1c4cd2760c')
  t.truthy(profile.isSlim)
})

// A user has deleted their profile skin.
// API behavior observed 28.08.2017 by maccelerated
test('resolves with no skin or cape', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/1a79a4d60de6718e8e5b326e338ae533')
    .reply(200, {
      'id': '1a79a4d60de6718e8e5b326e338ae533',
      'name': 'example',
      'properties': [{
        'name': 'textures',
        'value': 'eyJ0aW1lc3RhbXAiOjE1MDMzMzU4NTM3MDAsInByb2ZpbGVJZCI6IjFhNzlhNGQ2MGRlNjcxOGU4ZTViMzI2ZTMzOGFlNTMzIiwicHJvZmlsZU5hbWUiOiJleGFtcGxlIiwidGV4dHVyZXMiOnt9fQ=='
      }]
    })

  const profile = await getProfile('1a79a4d60de6718e8e5b326e338ae533')
  t.falsy(profile.skin)
  t.falsy(profile.cape)
})

// I never observed textures missing from a response,
// but this feature will need work if it ever breaks on the live API
test('rejects if textures is missing', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/c32b3ba80aa6d20e8a118b595e6b838d')
    .reply(200, {
      'id': 'c32b3ba80aa6d20e8a118b595e6b838d',
      'name': 'another example',
      'properties': []
    })

  const err = await t.throws(getProfile('c32b3ba80aa6d20e8a118b595e6b838d'))
  t.is(err.message, `Cannot read property 'name' of undefined`)
})

// API behavior observed 22.08.2017 by maccelerated
test('rejects with an invalid id', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/ae2b1fca515949e5d54fb22b8ed95575')
    .reply(204)

  const err = await t.throws(getProfile('ae2b1fca515949e5d54fb22b8ed95575'))
  t.is(err.message, 'no such profile')
})

// API behavior observed 28.08.2017 by maccelerated
test('rejects if the API throttles the client', async t => {
  nock('https://sessionserver.mojang.com')
    .get('/session/minecraft/profile/ae2b1fca515949e5d54fb22b8ed95575')
    .reply(429, {
      'error': 'TooManyRequestsException',
      'errorMessage': 'The client has sent too many requests within a certain amount of time'
    })

  const err = await t.throws(getProfile('ae2b1fca515949e5d54fb22b8ed95575'))
  t.is(err.name, 'TooManyRequestsException')
  t.is(err.message, 'The client has sent too many requests within a certain amount of time')
})
