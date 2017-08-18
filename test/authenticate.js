/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const authenticate = require('../lib/authenticate')

describe('authenticate()', () => {
  before((done) => {
    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/authenticate', {
        username: 'valid@user.com'
      })
      .reply(200, {
        accessToken: '123456abcdefghijklmnopqrstuvxyz',
        clientToken: 'xxxxyyyyd6b94f58b7fa21a1189a62e4'
      })

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/authenticate', {
        username: 'invalid@user.com'
      })
      .reply(403, {
        error: 'ForbiddenOperationException',
        errorMessage: 'Invalid credentials. Invalid username or password.'
      })
    done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should return an access token with valid credentials', () => {
    return authenticate('valid@user.com', 'password')
      .then((session) => {
        expect(session).to.have.property('accessToken')
        expect(session).to.have.property('clientToken')
      })
  })

  it('should fail with invalid credentials', () => {
    return authenticate('invalid@user.com', 'password')
      .then(() => {
        throw new Error('should have rejected')
      })
      .catch((err) => {
        expect(err).to.have.property('statusCode')
        expect(err.statusCode).to.equal(403)
        expect(err).to.have.property('name')
        expect(err.name).to.equal('ForbiddenOperationException')
        expect(err).to.have.property('message')
        expect(err.message).to.equal('Invalid credentials. Invalid username or password.')
      })
  })
})
