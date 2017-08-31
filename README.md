# mojang [![Build Status](https://travis-ci.org/jamen/node-mojang.svg?branch=master)](https://travis-ci.org/jamen/node-mojang)

> The most complete Node.js library for Mojang's HTTP APIs.

Includes the functions described on the [Minecraft modern wiki](http://wiki.vg/Main_Page), as well as several equally-important but undocumented endpoints. Every function makes a single HTTP request. This library requires Internet access to do anything. Please use [GitHub Issues](https://github.com/jamen/node-mojang/issues) to submit a bug, request an example, or report a missing feature.

## Install
```shell
$ npm install mojang
```

## Usage
Read the [documentation](https://maccelerated.github.io/node-mojang) or look in [examples/](/tree/master/examples) and [test/](/tree/master/test) folders.

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
$ nf run npm run test-online
```

## License
[MIT](LICENSE) &copy; Jamen Marzonie
