/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const signout = require('../lib/signout')

describe('mojang.signout()', () => {
  before((done) => {
    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/signout', {
        username: 'valid@user.com',
        password: 'password'
      })
      .reply(204)

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/signout', {
        username: 'invalid@user.com',
        password: 'password'
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

  it('should resolve with valid credentials', () => {
    return signout('valid@user.com', 'password')
  })

  it('should reject with invalid credentials', () => {
    signout('invalid@user.com', 'password')
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
