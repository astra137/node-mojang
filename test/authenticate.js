/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const mojang = require('..')

describe('authenticate()', () => {
  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/authenticate', {
        username: 'valid@user.com'
      })
      .reply(200, {
        accessToken: '123456abcdefghijklmnopqrstuvxyz',
        clientToken: 'xxxxyyyyd6b94f58b7fa21a1189a62e4'
      })
      .post('/authenticate', {
        username: 'invalid@user.com'
      })
      .reply(200, {
        error: 'ForbiddenOperationException',
        errorMessage: 'Invalid credentials. Invalid username or password.'
      })
    done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should return an access token with valid credentials', (done) => {
    mojang.authenticate('valid@user.com', 'password')
      .then((tokens) => {
        expect(tokens).to.have.property('accessToken')
        expect(tokens).to.have.property('clientToken')
      })
      .then(done)
      .catch(done)
  })

  it('should fail with invalid credentials', (done) => {
    mojang.authenticate('invalid@user.com', 'password')
      .catch((err) => {
        expect(err).to.have.property('message')
      })
      .then(() => {
        done(new Error('should have rejected'))
      })
  })
})
