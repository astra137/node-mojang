const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
  * Get statistics on the sales of Minecraft.
  *
  * @param {Array<string>} [metricKeys] - list of metric keys to combine the stats of
  * @returns {Promise<{total: number, last24: number, saleVelocityPerSeconds: number}[]>} resolves if metricKeys is provided
  * @see {@link http://wiki.vg/Mojang_API#Statistics}
  */
function getOrdersStatistics (metricKeys = ['item_sold_minecraft', 'prepaid_card_redeemed_minecraft']) {
  return fetch(`${CORE_API}/orders/statistics`, {
    method: 'POST',
    body: JSON.stringify({metricKeys}),
    headers: {
      'user-agent': USER_AGENT,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = getOrdersStatistics
