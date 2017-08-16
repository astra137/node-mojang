'use strict'
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.auth()', () => {
  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/authenticate', {
        username: 'valid@user.com'
      })
      .reply(200, {
        accessToken: '123456abcdefghijklmnopqrstuvxyz',
        clientToken: 'xxxxyyyyd6b94f58b7fa21a1189a62e4'
      })
      .post('/authenticate')
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
    mojang.auth('valid@user.com', 'password')
      .then((tokens) => {
        expect(tokens).to.have.property('accessToken')
        expect(tokens).to.have.property('clientToken')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })

  it('should fail with invalid credentials', (done) => {
    mojang.auth('invalid@username.com', 'invalidpassword')
      .then((result) => {
        expect(result).to.have.property('error')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })
})
