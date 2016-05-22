var test = require('tape');
var nock = require('nock');
var mojang = require('..');

test('single username no timestamp', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBar')
  .reply(200, {
    id: '123abc',
    name: 'FooBar'
  });

  mojang.username('FooBar').then(function(player) {
    t.same(player, {
      id: '123abc',
      name: 'FooBar'
    }, 'valid response');
  }, t.fail);
});

test('single username with timestamp', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBar?at=bar')
  .reply(200, {
    id: '456def',
    name: 'FooBar'
  });

  mojang.username('FooBar', 'bar').then(function(player) {
    t.same(player, {
      id: '456def',
      name: 'FooBar'
    }, 'valid response');
  }, t.fail);
});

test('multiple usernames with no timestamps', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/profiles/minecraft')
  .post('/', ['FooBar', 'FooBaz'])
  .reply(200, [{
    id: '123abc',
    name: 'FooBar'
  }, {
    id: '789ghi',
    name: 'FooBaz'
  }]);

  mojang.username(['FooBar', 'FooBaz']).then(function(players) {
    t.same(players, [{
      id: '123abc',
      name: 'FooBar'
    }, {
      id: '789ghi',
      name: 'FooBaz'
    }], 'valid response');
  }, t.fail);
});

test('multiple usernames with one timestamp', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBar?at=bar')
  .reply(200, {
    id: '456def',
    name: 'FooBar'
  });

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBaz?at=bar')
  .reply(200, {
    id: '789ghi',
    name: 'FooBaz'
  });

  mojang.username(['FooBar', 'FooBaz'], 'bar').then(function(players) {
    t.same(players, [{
      id: '456def',
      name: 'FooBar'
    }, {
      id: '789ghi',
      name: 'FooBaz'
    }], 'valid response');
  });
});

test('multiple usernames with different timestamps', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBar?at=bar')
  .reply(200, {
    id: '456def',
    name: 'FooBar'
  });

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/FooBaz?at=qux')
  .reply(200, {
    id: '321xyz',
    name: 'FooBar'
  });

  mojang.username({
    FooBar: 'bar',
    FooBaz: 'qux'
  }).then(function(players) {
    t.same(players, [{
      id: '456def',
      name: 'FooBar'
    }, {
      id: '321xyz',
      name: 'FooBar'
    }], 'valid response');
  }, t.fail);
});

test('single nonexistent username', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/users/profiles/minecraft')
  .get('/Nonexistent')
  .reply(204);

  mojang.username('Nonexistent').then(function(player) {
    t.false(player, 'falsey value');
  });
});

test('multiple nonexistent usernames', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/profiles/minecraft')
  .post('/', ['Nonexistent', 'DoesntExist'])
  .reply(200, []);

  mojang.username(['Nonexistent', 'DoesntExist']).then(function(player) {
    t.same(player, [], 'empty array');
  });
});
