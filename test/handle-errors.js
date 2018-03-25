const test = require('ava')
const {Response} = require('node-fetch')
const handleErrors = require('../lib/handle-errors')

test('handles errors that are not json', async t => {
  const res = new Response('i goofed', { status: 500 })
  const err = await t.throws(() => handleErrors(res))
  t.is(err.message, 'Internal Server Error')
  t.is(err.name, 'Error')
})

test('handles json errors that break the template', async t => {
  const res = new Response(`{"goofed":true}`, {
    status: 500,
    headers: {'content-type': 'application/json'}
  })
  const err = await t.throws(handleErrors(res))
  t.is(err.message, 'Internal Server Error')
  t.is(err.name, 'Error')
})
