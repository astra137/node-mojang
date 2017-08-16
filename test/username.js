'use strict'
const chai = require('chai')
const expect = chai.expect
const mojang = require('../')

describe('mojang.username()', () => {
  it('should return a object with id and name', (done) => {
    mojang.username('MoVo99')
      .then((user) => {
        expect(user).to.not.be.null
        expect(user).to.have.property('id')
        expect(user).to.have.property('name')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })

  it('should throw an error when the username is invalid', (done) => {
    mojang.username('aninvalidusernamebecauseitstoolong')
      .then((user) => {
        expect(user).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })
})
