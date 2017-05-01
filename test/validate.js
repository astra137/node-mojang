'use strict';
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.validate()', () => {

  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/validate', {
        accessToken: '0123456789',
        clientToken: '9876543210'
      })
      .reply(204, {})
      .post('/validate')
      .times(2)
      .reply(403, {
        error: 'ForbiddenOperationException',
        errorMessage: 'Invalid token'
      })
      done()
  })

  it('should reject when a valid accessToken is provided', (done) => {
    mojang.validate('0123456789', '9876543210')
      .then((result) => {
        expect(result).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })

  it('should resolve when an invalid accessToken is provided', (done) => {
    mojang.validate('00123456789', '98765432100')
      .then((result) => {
        expect(result).to.not.be.null
        expect(result).to.have.property('error')
        expect(result).to.have.property('errorMessage')
        done()        
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })

  it('should resolve when the clientToken is not vallid for this accessToken', (done) => {
    mojang.validate('00123456789', '')
      .then((result) => {
        expect(result).to.not.be.null
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