const chai = require('chai')
const expect = chai.expect
const mojang = require('../')

describe('mojang.status()', () => {
  it('should return an array', (done) => {
    mojang.status()
      .then((status) => {
        expect(status).to.not.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })
})
