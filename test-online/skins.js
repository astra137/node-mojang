/* eslint-disable ava/no-ignored-test-files */

import {createReadStream} from 'fs'
import yn from 'yn'

const test = require('ava')
const mojang = require('..')

const {
  MOJANG_USERNAME,
  MOJANG_PASSWORD,
  MOJANG_CLIENT_TOKEN,
  PROFILE_UUID,
  SKIN_FILE,
  USE_SLIM
} = process.env

const seconds = ms => new Promise(resolve => setTimeout(resolve, ms * 1000))

test('security integration', async t => {
  const credentials = {
    username: MOJANG_USERNAME,
    password: MOJANG_PASSWORD,
    clientToken: MOJANG_CLIENT_TOKEN
  }

  // Create unprofiled session
  const session = await mojang.authenticate(credentials)
  t.is(session.clientToken, MOJANG_CLIENT_TOKEN)
  await seconds(1)

  // Ensure IP is "secure" and skin upload will work
  const canUploadSkin = await mojang.isSecure(session)
  if (!canUploadSkin) throw new Error('secure this IP: log into minecraft.net')
  await seconds(1)

  // Test URL version of skin API
  const skinUrl = `http://assets.mojang.com/SkinTemplates/alex.png`
  await mojang.setSkin(session, PROFILE_UUID, skinUrl, true)
  console.warn(`https://minecraft.net/en-us/profile/skin`)
  console.warn(`Check that skin is default Alex with slim`)
  console.warn(`Waiting 30 seconds...`)
  await seconds(30)

  // Test upload stream version of skin API
  const useSlim = yn(USE_SLIM)
  const sSkin = createReadStream(SKIN_FILE)
  await mojang.uploadSkin(session, PROFILE_UUID, sSkin, useSlim)
  console.warn(`Check that skin is uploaded with useSlim: ${useSlim}`)
  await seconds(1)

  // invalidate only this access token
  await mojang.invalidate(credentials)
})
