const test = require('ava')
const nock = require('nock')
const {getProfileAt} = require('../..')

test('resolves with a valid username', async t => {
  // behavior observed 23.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/users/profiles/minecraft/notch')
    .reply(200, {
      'id': '069a79f444e94726a5befca90e38aaf5',
      'name': 'Notch'
    })

  const info = await getProfileAt('notch')
  t.is(info.id, '069a79f444e94726a5befca90e38aaf5')
})

test('resolves with name and date', async t => {
  // behavior observed 23.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/users/profiles/minecraft/MoVo99?at=1503335853700')
    .reply(200, {
      'id': '47c49720c9ee42009ef05e1c4cd2760c',
      'name': 'MoVo99'
    })

  const info = await getProfileAt('MoVo99', 1503335853700)
  t.is(info.id, '47c49720c9ee42009ef05e1c4cd2760c')
})

test('rejects with invalid username', async t => {
  // behavior observed 23.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/users/profiles/minecraft/notrealusername')
    .reply(204)

  const err = await t.throws(getProfileAt('notrealusername'))
  t.is(err.message, 'so such name at time: notrealusername')
})

test('rejects if username did not exist at the time', async t => {
  // behavior observed 23.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/users/profiles/minecraft/notch?at=0')
    .reply(204)

  const err = await t.throws(getProfileAt('notch', 0))
  t.is(err.message, 'so such name at time: notch')
})

test('rejects wrapped error on invalid timestamp', async t => {
  // behavior observed 23.08.2017 by maccelerated
  nock('https://api.mojang.com')
    .get('/users/profiles/minecraft/notrealusername?at=badtimestamp')
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'Invalid timestamp.'
    })

  const err = await t.throws(getProfileAt('notrealusername', 'badtimestamp'))
  t.is(err.name, 'IllegalArgumentException')
  t.is(err.message, 'Invalid timestamp.')
})
