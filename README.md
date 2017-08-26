# mojang [![Build Status](https://travis-ci.org/jamen/node-mojang.svg?branch=master)](https://travis-ci.org/jamen/node-mojang)

> A Node.js wrapper for Mojang's different APIs.

A (soon to be) complete interface for all [endpoints available from Mojang](http://wiki.vg/Main_Page).

## Install
```shell
$ npm install mojang
```

## Usage
```js
const mojang = require('mojang')

mojang.authenticate('email@domain.tld', 'mojang secret')
  .then(session => mojang.getUser(session.accessToken))
  .then(user => console.info(user))
  .catch(err => console.error(err))
```

> See the [API documentation](https://maccelerated.github.io/node-mojang) for more information.

## Support

- [Submit an issue/bug](https://github.com/jamen/node-mojang/issues)

## License
[MIT](LICENSE) &copy; Jamen Marzonie
