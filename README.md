mojang
======
> A node.js wrapper for Mojang's API.

A simple Node.js wrapper for Mojang's HTTP API.  It uses HTTPS requests wrapped in `Promise` objects, so you can perform multi-request actions easier.  Manage multiple Mojang requests easier with this API.

## Installation
```shell
$ npm install mojang
```

## Usage
```javascript
// ES6
import mojang from 'mojang';

// ES5
var mojang = require('mojang');
```

### `mojang.username(name, [date])`
Fetch UUID from the name(s).
 - `name`: (String, Array, Object) name, array of names, or object of names with dates.
 - `date`: (String) A unix timestamp

```javascript
mojang.username('RamenMarz').then(...);
mojang.username('RamenMarz', Date.now()).then;
mojang.username([ 'RamenMarz', 'Foo' ]).then(...);
mojang.username([ 'RamenMarz', 'Foo' ], Date.now()).then(...);
mojang.username({ 'RamenMarz': Date.now(), 'Foo': Date.now() }).then(...);
```

### `mojang.status()`
Get Mojang's servers' statuses.

```javascript
mojang.status().then(...);
```

### `mojang.profile(uuid)`
Get profile from UUIDs.
 - `uuid`: (String, Array) UUID(s) of profile(s) you want.

```javascript
mojang.profile('123FOO').then(...);
mojang.profile([ '123FOO', '456BAR' ]).then(...)
```

### `mojang.history(uuid)`
Fetch history by UUID.
 - `uuid`: (String, Array) UUID(s) of history(ies) you want.

```javascript
mojang.history('123FOO').then(...);
mojang.history([ '123FOO', '456BAR' ]).then(...)
```

### `mojang.auth(username, password, [clientToken])`
Authenticate
 - `username`: (String) email or uesrname of the Mojang account.
 - `password`: (String) password of the Mojang account.
 - `clientToken` (String) optional clientToken.

```javascript
mojang.auth('foo', 'bar', 'baz').then(...);
```

### `mojang.validate(accessToken, clientToken)`
Validate
 - `accessToken`: (String) accessToken of authentication.
 - `clientToken`: (String) clientToken of authentication.

```javascript
mojang.validate('foo', 'bar').then(...);
```

### `mojang.refresh(accessToken, clientToken, [profile])`
Refresh
 - `accessToken`: (String) accessToken of authentication.
 - `clientToken`: (String) clientToken of authentication.
 - `profile`: (Object) selectedProfile

```javascript
mojang.refresh('foo', 'bar', {}).then(...);
```

### `mojang.invalidate(accessToken, clientToken)`
Invalidate
 - `accessToken`: (String) accessToken of authentication.
 - `clientToken`: (String) clientToken of authentication.

```javascript
mojang.invalidate('foo', 'bar').then(...);
```


### `mojang.signout(username, password)`
Signout
 - `username`: (String) username of Mojang account.
 - `password`: (String) password of Mojang account.

### Using in parity
Since `node-mojang` is designed around promises, you can do quick multi-request actions.  For instance, if you want to get the history from a username, you can do something like this:
```javascript
mojang.username('RamenMarz')
.then(user => mojang.history(user.id))
.then(function(history) {
  // ...
});
```

## Support
 - [Repo Issues](https://github.com/jamen/node-mojang/issues)
 - [Authors](#Credits)

## Credits

|![Jamen Marz][jamen-image]|
|:--------:|
| [@jamen] |

## License
[MIT][license] &copy; Jamen Marzonie

<!-- All links must be "tagged" -->
 [example-badge]: https://img.shields.io/badge/example-badge-green.svg
 [foobar-badge]: https://img.shields.io/badge/foobar-baz-green.svg

 [@jamen]: https://github.com/jamen
 [jamen-image]: https://avatars2.githubusercontent.com/u/6251703?v=3&s=125

 [license]: LICENSE
