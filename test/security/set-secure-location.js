const test = require('ava')
const nock = require('nock')
const answerChallenges = require('../../src/security/set-secure-location')

// Taken from minecraft.net XHR requests by maccelerated
// API behavior observed 28.08.2017 by maccelerated
test('resolves with access token and security answers', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .post('/user/security/location', [
      {'id': 200000006, 'answer': 'pet'},
      {'id': 200000007, 'answer': 'movie'},
      {'id': 200000008, 'answer': 'age'}
    ])
    .reply(204)

  await answerChallenges('goodaccesstoken', [
    {'id': 200000006, 'answer': 'pet'},
    {'id': 200000007, 'answer': 'movie'},
    {'id': 200000008, 'answer': 'age'}
  ])

  t.pass()
})

// API behavior observed 28.08.2017 by maccelerated
test('rejects and wraps incorrect answer error', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': 'Bearer goodaccesstoken'
    }
  })
    .post('/user/security/location', [
      {'id': 200000006, 'answer': 'wrong'},
      {'id': 200000007, 'answer': 'movie'},
      {'id': 200000008, 'answer': 'age'}
    ])
    .reply(403, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'At least one answer was incorrect'
    })

  const err = await t.throws(answerChallenges('goodaccesstoken', [
    {'id': 200000006, 'answer': 'wrong'},
    {'id': 200000007, 'answer': 'movie'},
    {'id': 200000008, 'answer': 'age'}
  ]))

  t.is(err.name, 'ForbiddenOperationException')
  t.is(err.message, 'At least one answer was incorrect')
})

test.todo('rejects and wraps error if access token is bad')
