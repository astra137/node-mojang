const test = require('ava')
const mojang = require('..')

const {USERNAME, PASSWORD, CLIENT_TOKEN} = process.env
const {ANSWER1, ANSWER2, ANSWER3} = process.env
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('security integration', async t => {
  await delay(30000)

  // create unprofiled session
  const session = await mojang.authenticate(USERNAME, PASSWORD, CLIENT_TOKEN)
  t.is(session.clientToken, CLIENT_TOKEN)

  // access token is good
  await delay(1000)
  t.true(await mojang.isValid(session.accessToken, CLIENT_TOKEN))

  // get initial trust for good measure
  await delay(1000)
  await mojang.isSecure(session.accessToken)
  t.pass('location security fetch worked')

  // get questions and compile response
  await delay(1000)
  const challenges = await mojang.getChallenges(session.accessToken)

  // submit answers
  await delay(1000)
  await mojang.answerChallenges(session.accessToken, [
    {id: challenges[0].answer.id, answer: ANSWER1},
    {id: challenges[1].answer.id, answer: ANSWER2},
    {id: challenges[2].answer.id, answer: ANSWER3}
  ])

  // confirm IP is now secure
  await delay(1000)
  const isNowSecure = await mojang.isSecure(session.accessToken)
  t.true(isNowSecure)

  // invalidate all access tokens
  await delay(1000)
  await mojang.signout(USERNAME, PASSWORD)
})
