var test = require('tape');
var nock = require('nock');
var mojang = require('..');

test('single history', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/user/profiles')
  .get('/123abc/names')
  .reply(200, [{
    name: 'FooBar'
  }, {
    name: 'FooBaz',
    changedToAt: 'bar'
  }]);

  mojang.history('123abc').then(function(history) {
    t.same(history, [{
      name: 'FooBar'
    }, {
      name: 'FooBaz',
      changedToAt: 'bar'
    }], 'valid response');
  });
});

test('multiple histories', function(t) {
  t.plan(1);

  nock('https://api.mojang.com/user/profiles')
  .get('/123abc/names')
  .reply(200, [{
    name: 'FooBar'
  }, {
    name: 'FooBaz',
    changedToAt: 'bar'
  }]);

  nock('https://api.mojang.com/user/profiles')
  .get('/321xyz/names')
  .reply(200, [{
    name: 'BarFoo'
  }, {
    name: 'BarBaz',
    changedToAt: 'qux'
  }]);

  mojang.history(['123abc', '321xyz']).then(function(histories) {
    t.same(histories, [
      [{
        name: 'FooBar'
      }, {
        name: 'FooBaz',
        changedToAt: 'bar'
      }], [{
        name: 'BarFoo'
      }, {
        name: 'BarBaz',
        changedToAt: 'qux'
      }]
    ], 'valid response');
  });
});
