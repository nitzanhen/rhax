import { pick } from 'core';

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};

const keys = Object.keys(obj) as (keyof typeof obj)[];

describe('pick', () => {
  test('pick', () => {
    expect(pick(obj)).toEqual({});

    expect(pick(obj, ...keys)).toEqual(obj);
    expect(pick(obj, ...keys)).not.toBe(obj);

    expect(pick(obj, 'a', 'b')).toEqual({ a: 1, b: 2 });
    expect(pick(obj, 'a', 'c')).toEqual({ a: 1, c: 3 });
    expect(pick(obj, 'd')).toEqual({ d: 4 });
  });

  test('pick (curried)', () => {
    expect(pick()(obj)).toEqual({});

    expect(pick(...keys)(obj)).toEqual(obj);
    expect(pick(...keys)(obj)).not.toBe(obj);

    expect(pick('a', 'b')(obj)).toEqual({ a: 1, b: 2 });
    expect(pick('a', 'c')(obj)).toEqual({ a: 1, c: 3 });
    expect(pick('d')(obj)).toEqual({ d: 4 });
  });
});