/* eslint-disable ava/no-ignored-test-files */

const test = require('ava')
const mojang = require('..')

const {USERNAME, PASSWORD, CLIENT_TOKEN} = process.env

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('yggdrasil integration', async t => {
  // create unprofiled session
  const credentials = {
    username: USERNAME,
    password: PASSWORD,
    clientToken: CLIENT_TOKEN
  }

  const session = await mojang.authenticate(credentials)
  t.is(session.clientToken, CLIENT_TOKEN)

  // access token is good
  await delay(1000)
  t.true(await mojang.isValid(session))

  // refresh session
  await delay(1000)
  const nextSession = await mojang.refresh(session)
  t.not(nextSession.accessToken, session.accessToken)

  // old access token is bad
  await delay(1000)
  t.false(await mojang.isValid(session))

  // new access token is good
  await delay(1000)
  t.true(await mojang.isValid(nextSession))

  // invalidate newest access token
  await delay(1000)
  await mojang.invalidate(nextSession)

  // newest access token is also bad
  await delay(1000)
  t.false(await mojang.isValid(nextSession))

  // signout for good measure
  await delay(1000)
  await mojang.signout(credentials)
})
