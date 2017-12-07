const test = require('ava')
const nock = require('nock')
const {getChallenges} = require('../..')

// API behavior observed 28.08.2017 by maccelerated
test('resolves with valid access token', async t => {
  const accessToken = 'goodaccesstoken'

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user/security/challenges')
    .reply(200, [
      {
        'answer': {
          'id': 200000006
        },
        'question': {
          'id': 1,
          'question': "What is your favorite pet's name?"
        }
      },
      {
        'answer': {
          'id': 200000007
        },
        'question': {
          'id': 2,
          'question': 'What is your favorite movie?'
        }
      },
      {
        'answer': {
          'id': 200000008
        },
        'question': {
          'id': 21,
          'question': 'How old were you when you got your first computer?'
        }
      }
    ])

  const list = await getChallenges({accessToken})
  t.is(list[0].question.id, 1)
  t.is(list[0].answer.id, 200000006)
})

// API behavior observed 29.08.2017 by maccelerated
test('rejects if access token is bad', async t => {
  const accessToken = 'badaccesstoken'
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .get('/user/security/challenges')
    .reply(401, {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }, {
      'WWW-Authenticate': `Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"`
    })

  const err = await t.throws(getChallenges({accessToken}))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'Unauthorized')
})
