import test from 'ava';
import { uuid } from '../lib';

test('single username no time', t => {
  t.plan(1);

  uuid('JamenMarz').time(res => {
    t.same(res, {});
  });
});
