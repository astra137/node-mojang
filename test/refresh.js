'use strict';
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.refresh()', () => {

  before((done) => {

    nock('https://authserver.mojang.com')
      .post('/refresh')
      .reply(200, {
        accessToken: '123456abcdefghijklmnopqrstuvxyz',
        clientToken: 'xxxxyyyyd6b94f58b7fa21a1189a62e4'
      })
    done()
  })

  it('should return a new access and client token', (done) => {
    mojang.refresh('123456abcdefghijklmnopqrstuvxyz', 'xxxxyyyyd6b94f58b7fa21a1189a62e4')
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

})
