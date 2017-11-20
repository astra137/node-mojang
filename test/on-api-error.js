const got = require('got')
const test = require('ava')
const onApiError = require('../src/on-api-error')

// Like when authserver.mojang.com endpoints get bad credentials
test(`injects API response into thrown error`, t => {
  const originalError = new got.HTTPError(403, '', {}, {})
  originalError.response = {
    body: {
      error: 'ForbiddenOperationException',
      errorMessage: 'Invalid credentials. Invalid username or password.'
    }
  }
  const err = t.throws(() => onApiError(originalError))
  t.is(err.message, 'Invalid credentials. Invalid username or password.')
  t.is(err.name, 'ForbiddenOperationException')
})

// Like when api.mojang.com endpoints require Authorization: Bearer ${accessToken}
test(`injects www-authorization error description into thrown error`, t => {
  const originalError = new got.HTTPError(401, '', {
    'www-authenticate': 'Bearer realm="Mojang", error="invalid_token", error_description="The access token is invalid"'
  }, {})
  originalError.response = {
    body: {
      'error': 'Unauthorized',
      'errorMessage': 'The request requires user authentication'
    }
  }
  const err = t.throws(() => onApiError(originalError))
  t.is(err.message, 'The access token is invalid')
  t.is(err.name, 'Unauthorized')
})

// Just in case
test(`gracefully handles empty api error response`, t => {
  const originalError = new got.HTTPError(400, '', {}, {})
  originalError.response = {body: ''}
  const err = t.throws(() => onApiError(originalError))
  t.is(err.message, 'Response code 400 (Bad Request)')
  t.is(err.name, 'HTTPError')
})

// Because not all errors will be remote errors
test(`gracefully handles request errors too`, t => {
  const originalError = new got.RequestError(new Error('offline'), {})
  const err = t.throws(() => onApiError(originalError))
  t.is(err.message, 'offline')
  t.is(err.name, 'RequestError')
})
