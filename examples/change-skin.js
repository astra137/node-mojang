const mojang = require('..')

async function changeSkin () {
  try {
    const clientToken = process.env.CLIENT_TOKEN
    const username = process.env.USERNAME
    const password = process.env.PASSWORD
    const profileId = process.env.PROFILE_ID
    const newSkinUrl = process.env.SKIN_URL
    const useSlim = process.env.USE_SLIM

    const {accessToken} = await mojang.authenticate(username, password, clientToken)

    await new Promise(resolve => setTimeout(resolve, 1000))
    const isAccessValid = await mojang.isValid(accessToken, clientToken)
    if (!isAccessValid) throw new Error('bad access token')

    const canUploadSkin = await mojang.isSecure(accessToken)
    if (!canUploadSkin) throw new Error('log into minecraft.net first')

    await mojang.setSkin(accessToken, profileId, newSkinUrl, Boolean(useSlim))

    await new Promise(resolve => setTimeout(resolve, 5000))

    const {name, timestamp, skin, isSlim} = await mojang.getSession(profileId)

    console.log('accessToken', accessToken)
    console.log('name', name)
    console.log('timestamp', new Date(timestamp))
    console.log('skin', skin)
    console.log('isSlim', isSlim)
  } catch (err) {
    console.error(err)
  }
}

changeSkin()
