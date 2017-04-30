'use strict';
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.profile()', () => {

  before((done) => {
    nock('https://sessionserver.mojang.com')
      .get('/session/minecraft/profile/47c49720c9ee42009ef05e1c4cd2760c')
      .times(2)
      .reply(200, {
        id: '47c49720c9ee42009ef05e1c4cd2760c',
        name: 'testusername', 
        properties: [
          {
          name: 'textures',
          value: '123'
          }
        ]
      })
    nock('https://sessionserver.mojang.com')
      .get('/session/minecraft/profile/123')
      .reply(204, {})
    done()
  })

  it('with a valid uuid should return a json object', (done) => {
    mojang.profile('47c49720c9ee42009ef05e1c4cd2760c')
      .then((profile) => {
        expect(profile).to.have.property('id')
        expect(profile).to.have.property('name')
        expect(profile).to.have.property('properties')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })

  it('with an array of uuids should return a json array of the same length', (done) => {
    mojang.profile([
      '47c49720c9ee42009ef05e1c4cd2760c',
    ])
    .then((profiles) => {
      expect(profiles).to.not.be.null
      done()
    })
    .catch((err) => {
      expect(err).to.be.null
      done()
    })
  })

  it('with an invalid uuid should reject with error', (done) => {
    mojang.profile('123')
      .then((profile) => {
        expect(profile).to.be.null
        done()
      })
      .catch((err) => {
        expect(err).to.not.be.null
        done()
      })
  })

})