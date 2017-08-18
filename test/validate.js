/* eslint-env mocha */

const {expect} = require('chai')
const nock = require('nock')
const validate = require('../lib/validate')

describe('mojang.validate()', () => {
  before((done) => {
    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/validate', {
        accessToken: 'valid',
        clientToken: 'clientid'
      })
      .reply(204)

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/validate', {
        accessToken: 'valid'
        // clientToken is optional
      })
      .reply(204)

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/validate', {
        accessToken: 'invalid',
        clientToken: 'clientid'
      })
      .reply(403, {
        error: 'ForbiddenOperationException',
        errorMessage: 'Invalid token'
      })

    // Behavior observed 17.08.2017 by maccelerated
    nock('https://authserver.mojang.com')
      .post('/validate', {
        accessToken: 'valid',
        clientToken: 'wrongclient'
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

  it('should resolve with a valid accessToken and clientToken', () => {
    return validate('valid', 'clientid')
  })

  it('should resolve with without clientToken', () => {
    return validate('valid')
  })

  it('should reject with an invalid accessToken', () => {
    validate('invalid', 'clientid')
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

  it('should reject when clientToken is not valid for accessToken', () => {
    validate('valid', 'wrongclient')
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
