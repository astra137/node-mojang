const test = require('ava')
const nock = require('nock')
const {getOrdersStatistics} = require('../..')

// API behavior observed 30.08.2017 by maccelerated
test('resolves with statistics totals', async t => {
  nock('https://api.mojang.com')
    .post('/orders/statistics', {
      'metricKeys': [
        'item_sold_minecraft',
        'prepaid_card_redeemed_minecraft',
        'item_sold_cobalt',
        'item_sold_scrolls'
      ]
    })
    .reply(200, {
      'total': 26910522,
      'last24h': 5665,
      'saleVelocityPerSeconds': 0.086666666
    })

  const info = await getOrdersStatistics([
    'item_sold_minecraft',
    'prepaid_card_redeemed_minecraft',
    'item_sold_cobalt',
    'item_sold_scrolls'
  ])
  t.is(info.total, 26910522)
  t.is(info.last24h, 5665)
  t.is(info.saleVelocityPerSeconds, 0.086666666)
})

// API behavior observed 30.08.2017 by maccelerated
test('resolves with statistics totals for minecraft by default', async t => {
  nock('https://api.mojang.com')
    .post('/orders/statistics', {
      'metricKeys': [
        'item_sold_minecraft',
        'prepaid_card_redeemed_minecraft'
      ]
    })
    .reply(200, {
      'total': 0,
      'last24h': 0,
      'saleVelocityPerSeconds': 0
    })

  const info = await getOrdersStatistics()
  t.is(info.total, 0)
  t.is(info.last24h, 0)
  t.is(info.saleVelocityPerSeconds, 0)
})

// API behavior observed 30.08.2017 by maccelerated
test('rejects on missing metricKeys param', async t => {
  nock('https://api.mojang.com')
    .post('/orders/statistics', {
      'metricKeys': []
    })
    .reply(400, {
      'error': 'IllegalArgumentException',
      'errorMessage': 'No key provided.'
    })

  const err = await t.throws(getOrdersStatistics([]))
  t.is(err.message, 'No key provided.')
  t.is(err.name, 'IllegalArgumentException')
  t.is(err.statusCode, 400)
})
