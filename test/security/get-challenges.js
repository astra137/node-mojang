const test = require('ava')
const nock = require('nock')
const getChallenges = require('../../src/security/get-challenges')

// API behavior observed 28.08.2017 by maccelerated
test('resolves with valid access token', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
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

  const list = await getChallenges('goodaccesstoken')
  t.is(list[0].question.id, 1)
})

test.todo('rejects if access token is bad')
