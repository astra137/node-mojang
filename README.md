# mojang [![Build Status][build]][travis]

> Unofficial Node.js library for nearly all of Mojang's HTTP APIs.

Includes the functions described on the [Minecraft modern wiki](http://wiki.vg/Main_Page), as well as several equally-important but undocumented endpoints. Every function makes a single HTTP request. This library requires Internet access to do anything. Please use [GitHub Issues][issues] to submit a bug, request an example, or report a missing feature.

## Install
```shell
$ npm install mojang
```

## Usage
Read the [documentation][docs] or look in [examples/](/tree/master/examples) and [test/](/tree/master/test) folders.

```js
const mojang = require('mojang')

mojang.authenticate('email@domain.tld', 'mojang secret')
  .then(session => mojang.getUser(session.accessToken))
  .then(user => console.info(user))
  .catch(err => console.error(err))
```

## Testing
> Rate limit errors may look like `Invalid credentials. Invalid username or password.`

```shell
$ npm test
$ nf run npx ava test-online/yggdrasil.js
$ nf run npx ava test-online/security.js
```

## License
[MIT](LICENSE) &copy; Jamen Marzonie

> This repository is not affiliated with Mojang.

> "Minecraft" is a trademark of Mojang Synergies AB.

<!-- repo location specific -->
[build]: https://api.travis-ci.org/maccelerated/node-mojang.svg?branch=master
[travis]: https://travis-ci.org/maccelerated/node-mojang[travis]
[issues]: https://github.com/jamen/node-mojang/issues
[docs]: https://maccelerated.github.io/node-mojang
