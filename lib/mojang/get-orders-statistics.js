const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * Get statistics on the sales of Minecraft.
 *
 * @param {Array<string>} [metricKeys] - list of metric keys to combine the stats of
 * @returns {Promise<{total: number, last24: number, saleVelocityPerSeconds: number}[]>} resolves if metricKeys is provided
 * @see {@link http://wiki.vg/Mojang_API#Statistics}
 */
function getOrdersStatistics (metricKeys = ['item_sold_minecraft', 'prepaid_card_redeemed_minecraft']) {
  return mojang.post(`/orders/statistics`, {metricKeys})
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = getOrdersStatistics
