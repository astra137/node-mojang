# mojang

> Unofficial Node.js library for multiple Mojang HTTP APIs.


## Install

```sh
npm i mojang
```


## Usage

This library is for use with Node.js, and comes with TypeScript type definitions. All functions are async or promises.

```js
const mojang = require('mojang')
```

Look up profile IDs from current (or previous) in-game names. If a username or profile ID does not exist, these functions resolve with falsy values. These functions may throw errors if names are too long or profile IDs are not UUIDs.

```js
await mojang.username('direwolf20')
// { name: 'direwolf20', id: 'bbb87dbe690f4205bdc572ffb8ebc29d' }

await mojang.usernames(['direwolf20'])
// [ { id, name }, ... ]

await mojang.profile('bbb87dbe690f4205bdc572ffb8ebc29d')
// { id, name }

await mojang.history('bbb87dbe690f4205bdc572ffb8ebc29d')
// [{ name }, { name, changedToAt }, ...]
```

The API status endpoint isn't always accurate, but is available.

```js
await mojang.status()
// { 'api.mojang.com': 'green', ... }
```

Mojang's sales statistics are available too.

```js
await mojang.statistics()
// { total, last24h, saleVelocityPerSeconds }
```


### Authentication (Yggdrasil)

Authenticated sessions may be created to play Minecraft or change skins. For reference, the official launcher generates a client token with UUID v4, and saves it forever.

```js
let session = await mojang.authenticate(email, secret, clientToken)
// { accessToken, clientToken, user, availableProfiles, selectedProfile }
// Or throws if credentials are wrong
```

The `accessToken` should be saved as part of a "stay logged in" feature. Before launching the game, check that a saved token is still valid.

```js
await mojang.validate(session)
// true or false
```

If `validate` returns false, a launcher should attempt to refresh the session. This could create a new access token and invalidate the old token. It might also throw an error.

```js
session = await mojang.refresh(session)
// { accessToken, clientToken, user, selectedProfile }
```

When a user wants to log out, invalidate their current access token.

```js
await mojang.invalidate(session)
```

The access token appears to be a JWT and can be decoded. `sub` is the user ID, `spr` is the selected profile ID, `yggt` is the original access token from earlier Yggdrasil versions, and `iss` is always "Yggdrasil-Auth".

```js
const { JWT } = require("jose");
JWT.decode(accessToken)
// { sub, yggt, spr, iss, exp, iat }
```


### Changing Skins

Before changing skins, a user's IP must be trusted. Changing skins on minecraft.net will prompt the user the trust their current IP address by asking security questions.

Alternatively, this library's `challenges` and `answers` functions can be used to implement your own interface for answering the user's security questions. See https://wiki.vg/Mojang_API#Security_question-answer_flow for more information.

```js
await isTrusted(accessToken)
// false

await challenges(accessToken)
// [{}, ...]

await answers(accessToken, answerList)
```

To change skins, use a stream or buffer with `uploadSkin`, or use a image URL with `setSkin`. The function `resetSkin` will return the profile to a Steve or Alex skin, depending on the profile's ID.

```js
const skinStream = fs.createReadStream(skinFile)
await mojang.uploadSkin(accessToken, profileId, skinStream, isSlimBool)
// or
await mojang.setSkin(accessToken, profileId, skinUrl, isSlimBool)
// or
await mojang.resetSkin(accessToken, profileId)
```

A profile's default skin is either Alex or Steve, derived from the profile's ID. This function uses Crafatar's logic.

```js
mojang.isAlex(profileId)
// true or false
```


### Sessions

Get a profile's session for skin and cape data. This function reshapes the response JSON to be a bit more developer friendly, but the original, decoded `textures` dictionary is also available. **This endpoint is severely rate-limited.** See https://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape for more information.

```js
await mojang.session('bbb87dbe690f4205bdc572ffb8ebc29d')
/*
{
  name: 'direwolf20',
  slim: false,
  skin: 'http://textures.minecraft.net/texture/4c7b0468044bfecacc43d00a3a69335a834b73937688292c20d3988cae58248d',
  cape: undefined,
  textures: {},
  signature: ""
}
*/
```


### Error Handling

Promises and async try/catch are supported. If the server responds with an error code and JSON, the thrown error might have the property `error.response.body` which contains the server's JSON. 401 status codes are thrown on some endpoints that did not get valid access tokens.

```js
try {
    await mojang.authenticate(email, secret, clientToken);
    // ...
} catch (error) {
    // https://github.com/sindresorhus/got#errors
    // error.name === "HTTPError"
    // error.response.statusCode === 403

    // https://wiki.vg/Authentication#Errors
    // error.response.body.error === "ForbiddenOperationException"
    // error.response.body.errorMessage === "Invalid credentials. Invalid username or password."
}
```


### Electron

This library may be used to create Minecraft launchers with Electron. This library uses [got](https://github.com/sindresorhus/got#electron-support-has-been-removed) internally, so using it in the main process or with `electron.remote` is necessary.

Modern browsers and Electron renderer processes will prohibit requests to Mojang's APIs because they do not support CORS, at the time of writing.


## Contributing

I'm still learning how to maintain projects or contribute to open source in general. All PRs, issues, and general feedback are welcome!


## Testing

ESLint and TypeScript are used to lint the source.

Because Mojang's APIs might spontaneously change, it makes sense to test integration with the live endpoints, instead of mock responses. The file [test/online.js](test/online.js) can be run using AVA with the necessary environment variables set. I recommend [direnv](https://github.com/direnv/direnv) for setting environment variables. Wait between sequential tests and remember to reset the test account's skin afterwards.


## Related

- https://crafatar.com - API serving avatars and faces
- https://namemc.com - Search for players, skins, and capes
- [minecrafter/mojang-api](https://github.com/minecrafter/mojang-api) - Node library for some Mojang username and profile endpoints
- [zekesonxx/node-yggdrasil](https://github.com/zekesonxx/node-yggdrasil) - PrismarineJS's auth & server joining


## License

[ISC](icense.md) © [Mac](https://github.com/starburn)

> Project originally by @jamen.
>
> This repository is not affiliated with Mojang.
>
> "Minecraft" is a trademark of Mojang Synergies AB.
