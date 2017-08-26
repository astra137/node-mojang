const test = require('ava')
const mojang = require('../..')

const clientToken = 'd222df59-e11e-4903-b1f8-ead7d95db486'
const {USERNAME, PASSWORD} = process.env
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const cond = USERNAME && PASSWORD ? test : test.skip

cond('online authenticate & validate & refresh & invalidate & signout', async t => {
  // create session
  await delay(500)
  const session = await mojang.authenticate(USERNAME, PASSWORD, clientToken)
  t.is(session.clientToken, clientToken)

  // access token is good
  await delay(500)
  await mojang.validate(session.accessToken, clientToken)

  // refresh session
  await delay(500)
  const nextSession = await mojang.refresh(session.accessToken, clientToken)
  t.not(nextSession.accessToken, session.accessToken)

  // old access token is bad
  await delay(500)
  await t.throws(mojang.validate(session.accessToken, clientToken))

  // new access token is good
  await delay(500)
  await mojang.validate(nextSession.accessToken, clientToken)

  // invalidate newest access token
  await delay(500)
  await mojang.invalidate(nextSession.accessToken, clientToken)

  // newest access token is also bad
  await delay(500)
  await t.throws(mojang.validate(nextSession.accessToken, clientToken))

  // signout for good measure
  await delay(500)
  await mojang.signout(USERNAME, PASSWORD)
})
