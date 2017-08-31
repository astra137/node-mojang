<!-- repo location specific -->
[docs]: https://maccelerated.github.io/node-mojang
[issues]: https://github.com/jamen/node-mojang/issues
[build]: https://api.travis-ci.org/maccelerated/node-mojang.svg?branch=master
[travis]: https://travis-ci.org/maccelerated/node-mojang
[coverage]: https://codecov.io/gh/maccelerated/node-mojang/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/maccelerated/node-mojang
[deps]: https://dependencyci.com/github/maccelerated/node-mojang/badge
[depci]: https://dependencyci.com/github/maccelerated/node-mojang
[vuln]: https://snyk.io/test/github/maccelerated/node-mojang/badge.svg
[snyk]: https://snyk.io/test/github/maccelerated/node-mojang

# mojang [![Build Status][build]][travis] [![Coverage][coverage]][codecov] [![Dependency Status][deps]][depci] [![Known Vulnerabilities][vuln]][snyk]

> Unofficial Node.js library for Mojang's HTTP APIs

Create sessions, get user info, change skins, and more with promises.

Includes the functions described on the [Minecraft modern wiki](http://wiki.vg/Main_Page), as well as several equally-important but undocumented endpoints. Every function makes a single HTTP request. This library requires Internet access to do anything. Please use [GitHub Issues][issues] to submit a bug, request an example, or report a missing feature.

## Install
```shell
$ npm install mojang
```

## Usage
Read the [documentation][docs] or look in [examples/](/examples) and [test/](/test) folders.

```js
const mojang = require('mojang')

mojang.authenticate('email@domain.tld', 'mojang secret')
  .then(session => mojang.getUser(session.accessToken))
  .then(user => console.info(user))
  .catch(err => console.error(err))
```

## Integration Testing
Optionally create *.env* file for `node-foreman` to load values out of.

```
CLIENT_TOKEN=<random UUID>
USERNAME=<mojang email>
PASSWORD=<mojang secret>
ANSWER1=<secret answer>
ANSWER2=<secret answer>
ANSWER3=<secret answer>
PROFILE_ID=<game profile to change skin>
SKIN_URL=<url of skin image to change to>
USE_SLIM=<leave blank or use "slim">
```

> Rate limit errors may look like `Invalid credentials. Invalid username or password.`

```shell
$ nf run npx ava test-online/yggdrasil.js
$ nf run npx ava test-online/security.js
$ nf run node examples/change-skin.js
```

## Related

- [mojang-api](https://github.com/minecrafter/mojang-api) - small library for some public Mojang endpoints

## Credits

|![@jamen](https://github.com/jamen.png?size=100) | ![@maccelerated](https://github.com/maccelerated.png?size=100) |
|---|---|
|[@jamen](https://github.com/jamen) | [Rob Mac](https://github.com/maccelerated) |

## License

[MIT © Jamen Marzonie](LICENSE)

> This repository is not affiliated with Mojang.

> "Minecraft" is a trademark of Mojang Synergies AB.
