var test = require('tape');
var nock = require('nock');
var mojang = require('..');

nock('https://status.mojang.com/')
.get('/check')
.reply(200, [{
  foo: 'bar'
}, {
  baz: 'qux'
}]);

test('server statuses', function(t) {
  t.plan(1);
  mojang.status().then(function(status) {
    t.same(status, {
      foo: 'bar',
      baz: 'qux'
    }, 'requests and formats');
  });
});
