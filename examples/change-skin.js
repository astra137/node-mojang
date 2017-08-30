const mojang = require('..')

async function changeSkin () {
  try {
    const accessToken = process.env.ACCESS_TOKEN
    const clientToken = process.env.CLIENT_TOKEN
    const profileId = process.env.PROFILE_ID
    const newSkinUrl = process.env.SKIN_URL
    const useSlim = process.env.USE_SLIM

    const isAccessValid = await mojang.isValid(accessToken, clientToken)
    if (!isAccessValid) throw new Error('bad access token')

    const canUploadSkin = await mojang.isSecure(accessToken)
    if (!canUploadSkin) throw new Error('log into minecraft.net first')

    await mojang.setSkin(accessToken, profileId, newSkinUrl, Boolean(useSlim))

    await new Promise(resolve => setTimeout(resolve, 5000))

    const {name, timestamp, skin, isSlim} = await mojang.getProfile(profileId)

    console.log(name)
    console.log(timestamp)
    console.log(skin)
    console.log(isSlim)
  } catch (err) {
    console.error(err)
  }
}

changeSkin()
