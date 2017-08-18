/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const refresh = require('../lib/refresh')

describe('mojang.refresh()', () => {
  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/refresh', {
        accessToken: 'oldvalid',
        clientToken: 'client',
        selectedProfile: null,
        requestUser: true
      })
      .reply(200, {
        accessToken: 'newvalid',
        clientToken: 'client',
        selectedProfile: {
          id: 'profile identifier',
          name: 'player name'
        },
        user: {
          id: 'user identifier',
          properties: []
        }
      })

      .post('/refresh', {
        accessToken: 'invalid',
        clientToken: 'client'
      })
      .reply(403, {
        error: 'ForbiddenOperationException',
        errorMessage: 'Invalid token'
      })
    done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should return a new access and client token', () => {
    return refresh('oldvalid', 'client', null, true)
      .then((tokens) => {
        expect(tokens).to.have.property('accessToken')
        expect(tokens).to.have.property('clientToken')
        expect(tokens).to.have.property('selectedProfile')
        expect(tokens).to.have.property('user')
      })
  })

  it('should reject with invalid tokens', () => {
    return refresh('invalid', 'client', null, true)
      .then(() => {
        throw new Error('should have rejected')
      })
      .catch((err) => {
        expect(err).to.have.property('statusCode')
        expect(err.statusCode).to.equal(403)
        expect(err).to.have.property('name')
        expect(err.name).to.equal('ForbiddenOperationException')
        expect(err).to.have.property('message')
        expect(err.message).to.equal('Invalid token')
      })
  })
})
