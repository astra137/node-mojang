'use strict';
const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const mojang = require('../')

describe('mojang.user()', () => {
  
  before((done) => {
    nock('https://api.mojang.com', {
      allowUnmocked: true
    })
      .get('/user')
      .reply(200, {
        id: 123456789,
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        username: "john.doe@example.com",
        registerIp: "127.0.0.1",
        migratedFrom: "minecraft.net",
        migratedAt: Date.now(),
        registeredAt: Date.now(),
        passwordChangedAt: Date.now(),
        dateOfBirth: Date.now(),
        deleted: false,
        blocked: false,
        secured: true,
        migrated: false,
        emailVerified: true,
        legacyUser: false,
        emailSubscriptionStatus: "PENDING",
        emailSubscriptionKey: "1234567890987654321",
        verifiedByParent: false,
        fullName: "John Doe",
        fromMigratedUser: true,
        hashed: false
      })
      .get('/user')
      .reply(401, {
        error: 'UnauthorizedOperationException',
        errorMessage: 'User not authenticated'
      })
      done()
  })

  after((done) => {
    nock.cleanAll()
    done()
  })

  it('should resolve with a user object when a valid accessToken is provided', (done) => {
    mojang.user('valid12345')
      .then((user) => {
        expect(user).to.have.property('id')
        expect(user).to.have.property('email')
        expect(user).to.have.property('firstName')
        expect(user).to.have.property('lastName')
        done()
      })
      .catch((err) => {
        expect(err).to.be.null
        done()
      })
  })

  it('should reject with an error', (done) => {
    mojang.user('1234567890abcde')
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
