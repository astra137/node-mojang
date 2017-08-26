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
  try {
    const {accessToken, clientToken} = session
    await mojang.validate(accessToken, clientToken)
    return session
    // old session is still good
  } catch (err) {
    const {accessToken, clientToken} = session
    return mojang.refresh(accessToken, clientToken)
    // new session automatically created
  }
}

const session = {
  accessToken: process.env.ACCESS_TOKEN,
  clientToken: 'b1624569-34dd-4a65-8ff8-55bffd0db83d'
}
resume(session)
  .then(nextSession => console.info(nextSession))
  .catch(err => console.error(err))
