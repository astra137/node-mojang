const mojang = require('..')

/*
Keep a user's session data in memory/on disk. It can go bad at any time, though.

When it comes times to start your application or launch the game:
- Call validate() to ensure the accessToken is still good
- Call refresh() if validation fails, and save the new accessToken
- Call authenticate() if refresh fails--user must log in again

See http://wiki.vg/Authentication for additional information.
*/

async function resume (session) {
  const {accessToken, clientToken} = session
  if (await mojang.isValid(accessToken, clientToken)) {
    return session
  } else {
    return mojang.refresh(accessToken, clientToken)
  }
}

resume({
  accessToken: process.env.ACCESS_TOKEN,
  clientToken: process.env.CLIENT_TOKEN
})
  .then(nextSession => console.info(nextSession))
  .catch(err => console.error(err))
