const test = require('ava')
const nock = require('nock')
const {answerChallenges} = require('../..')

// First observed in minecraft.net XHR requests
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
      'authorization': 'Bearer otheraccesstoken'
    }
  })
    .post('/user/security/location', [
      {'id': 200000006, 'answer': 'wrong pet'},
      {'id': 200000007, 'answer': 'movie'},
      {'id': 200000008, 'answer': 'age'}
    ])
    .reply(403, {
      'error': 'ForbiddenOperationException',
      'errorMessage': 'At least one answer was incorrect'
    })

  const err = await t.throws(answerChallenges('otheraccesstoken', [
    {'id': 200000006, 'answer': 'wrong pet'},
    {'id': 200000007, 'answer': 'movie'},
    {'id': 200000008, 'answer': 'age'}
  ]))

  t.is(err.message, 'At least one answer was incorrect')
  t.is(err.name, 'ForbiddenOperationException')
})

// API behavior observed 29.08.2017 by maccelerated
test('rejects if access token is bad', async t => {
  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer badaccesstoken`
    }
  })
    .post('/user/security/location', [
      {'id': 200000006, 'answer': 'pet'},
      {'id': 200000007, 'answer': 'movie'},
      {'id': 200000008, 'answer': 'age'}
    ])
    .reply(401, {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }, {
      'WWW-Authenticate': `Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"`
    })

  const err = await t.throws(answerChallenges('badaccesstoken', [
    {'id': 200000006, 'answer': 'pet'},
    {'id': 200000007, 'answer': 'movie'},
    {'id': 200000008, 'answer': 'age'}
  ]))

  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'invalid_token')
})
