'use strict'
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.signout()', () => {
  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/signout', {
        username: 'valid@user.com',
        password: 'password'
      })
      .reply(200, {})
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

  it('should reject with valid credentials', (done) => {
    mojang.signout('valid@user.com', 'password')
      .then((result) => {
        expect(result).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })

  it('should resolve with invalid credentials', (done) => {
    mojang.signout('invalid@user.com', 'password')
      .then((result) => {
        expect(result).to.have.property('error')
        expect(result).to.have.property('errorMessage')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })
})
