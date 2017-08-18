/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const status = require('../lib/status')

describe('mojang.status()', () => {
  before((done) => {
    // Behavior observed 17.08.2017 by maccelerated
    nock('https://status.mojang.com')
      .get('/check')
      .reply(200, [
        {
          'minecraft.net': 'green'
        },
        {
          'session.minecraft.net': 'green'
        },
        {
          'account.mojang.com': 'green'
        },
        {
          'auth.mojang.com': 'green'
        },
        {
          'skins.minecraft.net': 'green'
        },
        {
          'authserver.mojang.com': 'green'
        },
        {
          'sessionserver.mojang.com': 'green'
        },
        {
          'api.mojang.com': 'green'
        },
        {
          'textures.minecraft.net': 'green'
        },
        {
          'mojang.com': 'green'
        }
      ])

    done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should return an array', () => {
    status()
      .then((status) => {
        expect(status).to.not.be.null
        expect(status).to.not.be.null
        expect(status).to.not.be.null
      })
  })
})
