const test = require('ava')
const nock = require('nock')
const {lookupProfiles} = require('../..')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with minecraft profiles by default', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', [
      'notch',
      'move99',
      'nonExistingPlayer'
    ])
    .reply(200, [
      {
        'id': '1c3ca25de6f245f9a19640184fa94533',
        'name': 'Move99'
      },
      {
        'id': '069a79f444e94726a5befca90e38aaf5',
        'name': 'Notch'
      }
    ])

  const list = await lookupProfiles(['notch', 'move99', 'nonExistingPlayer'])
  t.is(list.length, 2, 'only two of the given names exist')
  t.is(list[0].name, 'Move99', 'name is case-corrected')
  t.is(list[1].name, 'Notch', 'name is case-corrected')
  t.falsy(list[1].legacy, 'Notch has migrated to mojang.com')
  t.falsy(list[1].demo, 'Notch has a paid account')
})

// API behavior observed 30.08.2017 by maccelerated
test('resolves with scrolls profiles if specified', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/scrolls', [
      'jeb'
    ])
    .reply(200, [
      {
        'id': 'e79eed64bc614b558ff4adae64030d52',
        'name': 'jeb'
      }
    ])

  const list = await lookupProfiles(['jeb'], 'scrolls')
  t.is(list[0].name, 'jeb')
  t.falsy(list[0].legacy)
  t.falsy(list[0].demo)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if profile name is null or empty', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', [''])
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'profileName can not be null or empty.'
    })

  const err = await t.throws(lookupProfiles(['']))
  t.is(err.message, `profileName can not be null or empty.`)
  t.is(err.name, `IllegalArgumentException`)
})

// I tried to also test for null, but got does not send body if it is null.
// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if list is undefined', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft')
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'profileNames is null'
    })

  const err = await t.throws(lookupProfiles())
  t.is(err.message, `profileNames is null`)
  t.is(err.name, `IllegalArgumentException`)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if list is an object', async t => {
  const apiError = {
    'error': 'JsonMappingException',
    'errorMessage': 'Can not deserialize instance of java.lang.String out of START_OBJECT token\n at [Source: HttpInputOverHTTP@24f9111d; line: 1, column: 1]'
  }
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', {test: 'test'})
    .reply(400, apiError)

  const err = await t.throws(lookupProfiles({test: 'test'}))
  t.is(err.message, apiError.errorMessage)
  t.is(err.name, apiError.error)
})
