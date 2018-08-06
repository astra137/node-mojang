const test = require('ava')
const nock = require('nock')
const {uploadSkin} = require('../..')

// NOTE that the integration test is the most likely to find bugs.

test('upload uses multipart content-type when provided a buffer', async t => {
  const accessToken = 'goodaccesstoken'
  const profileId = `7ddf32e17a6ac5ce04a8ecbf782ca509`

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': /(multipart\/form-data;boundary=)/ig
    }})
    .put(`/user/profile/${profileId}/skin`)
    .reply(204)

  await uploadSkin({accessToken}, profileId, Buffer.from('pngdata'))
  t.pass()
})

test('slim model option works', async t => {
  const accessToken = 'goodaccesstoken'
  const profileId = `7ddf32e17a6ac5ce04a8ecbf782ca509`

  nock('https://api.mojang.com', {
    reqheaders: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': /(multipart\/form-data;boundary=)/ig
    }})
    .put(`/user/profile/${profileId}/skin`, body => body.includes(`slim`))
    .reply(204)

  await uploadSkin({accessToken}, profileId, Buffer.from('pngdata'), true)
  t.pass()
})
