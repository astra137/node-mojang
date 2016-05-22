var test = require('tape');
var nock = require('nock');
var mojang = require('..');

test('single uuid', function(t) {
  t.plan(1);

  nock('https://sessionserver.mojang.com/session/minecraft/profile')
  .get('/123abc')
  .reply(200, {
    id: '123abc',
    name: 'FooBar',
    properties: []
  });

  mojang.uuid('123abc').then(function(profile) {
    t.same(profile, {
      id: '123abc',
      name: 'FooBar',
      properties: []
    }, 'valid response');
  });
});

test('multiple uuids', function(t) {
  t.plan(1);

  nock('https://sessionserver.mojang.com/session/minecraft/profile')
  .get('/123abc')
  .reply(200, {
    id: '123abc',
    name: 'FooBar',
    properties: []
  });

  nock('https://sessionserver.mojang.com/session/minecraft/profile')
  .get('/321xyz')
  .reply(200, {
    id: '321xyz',
    name: 'FooQux',
    properties: []
  });

  mojang.uuid(['123abc', '321xyz']).then(function(profiles) {
    t.same(profiles, [{
      id: '123abc',
      name: 'FooBar',
      properties: []
    }, {
      id: '321xyz',
      name: 'FooQux',
      properties: []
    }], 'valid response');
  });
});
