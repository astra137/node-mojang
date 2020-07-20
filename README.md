# mojang

> Unofficial Node.js library for multiple Mojang HTTP APIs.

## Usage

WIP: usage

```js
const mojang = require('mojang')
const yggdrasil = require('mojang/yggdrasil')
const account = require('mojang/account')
const session = require('mojang/session')
const realms = require('mojang/realms')
```

```js
await mojang.status()
// { 'api.mojang.com': 'green', ... }

await mojang.username('direwolf20')
// { id, name }

await mojang.usernames(['direwolf20'])
// [{ id, name }, ...]

await mojang.profile('6763c910dd624186bec1565b0d6c14dc')
// { id, name }

await mojang.history('6763c910dd624186bec1565b0d6c14dc')
// [{ name }, { name, changedToAt }, ...]

await mojang.ordersStatistics()
// { total, last24h, saleVelocityPerSeconds }
```

```json
{
  "sub": "...",
  "yggt": "...",
  "spr": "...",
  "iss": "Yggdrasil-Auth",
  "exp": 1600000000,
  "iat": 1600000000
}
```

## Testing

WIP: manual online testing with coverage and caveats

## Related

- https://crafatar.com - API serving avatars and faces
- https://namemc.com - Search for players, skins, and capes
- [minecrafter/mojang-api](https://github.com/minecrafter/mojang-api) - Node library for some Mojang username and profile endpoints
- [zekesonxx/node-yggdrasil](https://github.com/zekesonxx/node-yggdrasil) - PrismarineJS's auth & server joining

## License

[ISC](license.md) © [Mac](https://github.com/starburn)

> Project originally by @jamen.
>
> This repository is not affiliated with Mojang.
>
> "Minecraft" is a trademark of Mojang Synergies AB.
