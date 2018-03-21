/* eslint-disable ava/no-ignored-test-files */

const test = require('ava')
const mojang = require('..')

const {
  MOJANG_USERNAME,
  MOJANG_PASSWORD,
  MOJANG_CLIENT_TOKEN,
  MOJANG_ANSWER1,
  MOJANG_ANSWER2,
  MOJANG_ANSWER3
} = process.env

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('security integration', async t => {
  const credentials = {
    username: MOJANG_USERNAME,
    password: MOJANG_PASSWORD,
    clientToken: MOJANG_CLIENT_TOKEN
  }

  // create unprofiled session
  const session = await mojang.authenticate(credentials)
  t.is(session.clientToken, MOJANG_CLIENT_TOKEN)

  // access token is good
  await delay(1000)
  t.true(await mojang.isValid(session))

  // get initial trust for good measure
  await delay(1000)
  await mojang.isSecure(session)
  t.pass('location security fetch worked')

  // get questions and compile response
  await delay(1000)
  const challenges = await mojang.getChallenges(session)

  // submit answers
  await delay(1000)
  await mojang.answerChallenges(session, [
    {id: challenges[0].answer.id, answer: MOJANG_ANSWER1},
    {id: challenges[1].answer.id, answer: MOJANG_ANSWER2},
    {id: challenges[2].answer.id, answer: MOJANG_ANSWER3}
  ])

  // confirm IP is now secure
  await delay(1000)
  const isNowSecure = await mojang.isSecure(session)
  t.true(isNowSecure)

  // invalidate all access tokens
  await delay(1000)
  await mojang.signout(credentials)
})
