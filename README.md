<!-- repo location specific -->
[docs]: https://maccelerated.github.io/node-mojang
[issues]: https://github.com/jamen/node-mojang/issues
[build]: https://api.travis-ci.org/maccelerated/node-mojang.svg?branch=master
[travis]: https://travis-ci.org/maccelerated/node-mojang
[coverage]: https://codecov.io/gh/maccelerated/node-mojang/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/maccelerated/node-mojang

# mojang [![Build Status][build]][travis] [![Coverage][coverage]][codecov]

> Unofficial Node.js library for Mojang's HTTP APIs

Create sessions, get user info, change skins, and more with promises.

Includes the functions described on the [Minecraft modern wiki](http://wiki.vg/Main_Page), as well as several equally-important but undocumented endpoints. Every function makes a single request. This library requires Internet access to do anything. Please use [GitHub Issues][issues] to submit a bug, request an example, or report a missing feature.

## Install
```shell
$ npm install mojang
```

## Usage
Read the [documentation][docs] or look in [examples/](/examples) and [test/](/test) folders.

```js
const mojang = require('mojang')

mojang.authenticate({username, password})
  .then(session => mojang.getUser(session))
  .then(user => console.info(user))
  .catch(err => console.error(err))
```

## Related

- [mojang-api](https://github.com/minecrafter/mojang-api) - small library for some Mojang username and profile endpoints
- [yggdrasil](https://github.com/zekesonxx/node-yggdrasil) - PrismarineJS's Mojang authentication with server joining

## Integration Testing
Create *.env* file for `env-cmd` to load values out of. Wait a minute between tests.

```
# security, yggdrasil, change-skin
CLIENT_TOKEN=<random UUID>
USERNAME=<mojang email>
PASSWORD=<mojang secret>
# security
ANSWER1=<secret answer>
ANSWER2=<secret answer>
ANSWER3=<secret answer>
# change-skin
PROFILE_ID=<game profile to change skin>
SKIN_URL=<url of skin image to change to>
USE_SLIM=<leave blank or use "slim">
```

> Rate limit errors may look like `Invalid credentials. Invalid username or password.`

```shell
$ npx env-cmd .env npx ava test-online/yggdrasil.js
$ npx env-cmd .env npx ava test-online/security.js
$ npx env-cmd .env node examples/change-skin.js
```

## License

[MIT © Jamen Marzonie](LICENSE)

> This repository is not affiliated with Mojang.

> "Minecraft" is a trademark of Mojang Synergies AB.
