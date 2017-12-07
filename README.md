<!-- repo location specific -->
[docs]: https://jamen.github.io/node-mojang
[issues]: https://github.com/jamen/node-mojang/issues
[build]: https://api.travis-ci.org/jamen/node-mojang.svg?branch=master
[travis]: https://travis-ci.org/jamen/node-mojang
[coverage]: https://codecov.io/gh/jamen/node-mojang/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/jamen/node-mojang

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

## License

[MIT © Jamen Marzonie](LICENSE)

> This repository is not affiliated with Mojang.

> "Minecraft" is a trademark of Mojang Synergies AB.
