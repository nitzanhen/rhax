import { omit } from 'core';

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};

const keys = Object.keys(obj) as (keyof typeof obj)[];

describe('omit', () => {
  test('omit', () => {
    expect(omit(obj)).toEqual(obj);
    expect(omit(obj)).not.toBe(obj);

    expect(omit(obj, ...keys)).toEqual({});

    expect(omit(obj, 'a', 'b')).toEqual({ c: 3, d: 4 });
    expect(omit(obj, 'a', 'c')).toEqual({ b: 2, d: 4 });
    expect(omit(obj, 'd')).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('omit (curried)', () => {
    expect(omit()(obj)).toEqual(obj);
    expect(omit()(obj)).not.toBe(obj);

    expect(omit(...keys)(obj)).toEqual({});

    expect(omit('a', 'b')(obj)).toEqual({ c: 3, d: 4 });
    expect(omit('a', 'c')(obj)).toEqual({ b: 2, d: 4 });
    expect(omit('d')(obj)).toEqual({ a: 1, b: 2, c: 3 });
  });
});