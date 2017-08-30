const test = require('ava')
const nock = require('nock')
const {getProfiles} = require('../..')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with a valid username', async t => {
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

  const list = await getProfiles(['notch', 'move99', 'nonExistingPlayer'])
  t.is(list.length, 2, 'only two of the given names exist')
  t.is(list[0].name, 'Move99', 'name is case-corrected')
  t.is(list[1].name, 'Notch', 'name is case-corrected')
  t.falsy(list[1].legacy, 'Notch has migrated to mojang.com')
  t.falsy(list[1].demo, 'Notch has a paid account')
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if profile name is null or empty', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', [''])
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'profileName can not be null or empty.'
    })

  const err = await t.throws(getProfiles(['']))
  t.is(err.message, `profileName can not be null or empty.`)
  t.is(err.name, `IllegalArgumentException`)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if list is undefined', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft')
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'profileNames is null'
    })

  const err = await t.throws(getProfiles())
  t.is(err.message, `profileNames is null`)
  t.is(err.name, `IllegalArgumentException`)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if list is null', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', null)
    .reply(415, {
      'error': 'ResourceException',
      'errorMessage': 'Unsupported Media Type (415) - The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method'
    })

  const err = await t.throws(getProfiles(null))
  t.is(err.name, `ResourceException`)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects with API error if list is an object', async t => {
  nock('https://api.mojang.com')
    .post('/profiles/minecraft', {})
    .reply(400, {
      'error': 'JsonMappingException',
      'errorMessage': 'Can not deserialize instance of java.lang.String out of START_OBJECT token\n at [Source: HttpInputOverHTTP@24f9111d; line: 1, column: 1]'
    })

  const err = await t.throws(getProfiles({}))
  t.is(err.name, `JsonMappingException`)
})
