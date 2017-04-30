'use strict';
const chai = require('chai')
const expect = chai.expect
const mojang = require('../')

describe('mojang.auth()', () => {

  // TODO implement test scenario with valid credentials 

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
