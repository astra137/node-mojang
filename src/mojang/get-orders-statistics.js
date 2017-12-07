const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Get statistics on the sales of Minecraft.
 *
 * @param {Array<String>} [metricKeys] - list of metric keys to combine the stats of
 * @returns {Promise<{total: Number, last24: Number, saleVelocityPerSeconds: Number}[]>} resolves if metricKeys is provided
 * @see {@link http://wiki.vg/Mojang_API#Statistics}
 */
function getOrdersStatistics (metricKeys = ['item_sold_minecraft', 'prepaid_card_redeemed_minecraft']) {
  return got(`${MOJANG_API}/orders/statistics`, {
    headers: {'user-agent': USER_AGENT},
    json: true,
    body: {metricKeys}
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = getOrdersStatistics
