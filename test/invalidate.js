'use strict';
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.invalidate()', () => {

  before((done) => {
    nock('https://authserver.mojang.com')
      .post('/invalidate')
      .reply(204)
    done()
  })

  it('should reject with valid tokens', (done) => {
    mojang.invalidate('123456abcdefghijklmnopqrstuvxyz', 'xxxxyyyyd6b94f58b7fa21a1189a62e4')
      .then((result) => {
        expect(result).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })

  it('as well as with invalid ones', (done) => {
    mojang.invalidate('', '')
      .then((result) => {
        expect(resizeBy).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })

})
