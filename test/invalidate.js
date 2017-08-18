/* eslint-env mocha */

const nock = require('nock')
const invalidate = require('../lib/invalidate')

describe('mojang.invalidate()', () => {
  before((done) => {
    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/invalidate', {
        accessToken: 'valid',
        clientToken: 'clientToken' // optional
      })
      .reply(204)

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/invalidate', {
        accessToken: 'invalid',
        clientToken: 'clientToken'
      })
      .reply(204)

    done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should resolve with valid tokens', () => {
    return invalidate('valid', 'clientToken')
  })

  it('should also resolve with invalid tokens', () => {
    return invalidate('invalid', 'clientToken')
  })
})
