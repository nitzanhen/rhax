import { entries, isEmpty, keys, tuple, values } from 'core';

describe('helpers', () => {

  const obj = { a: 1, b: 2, c: 3 };

  test('keys', () => {
    expect(keys({})).toEqual([]);
    expect(keys(obj)).toEqual(['a', 'b', 'c']);
  });

  test('values', () => {
    expect(values({})).toEqual([]);
    expect(values(obj)).toEqual([1, 2, 3]);
  });

  test('entries', () => {
    expect(entries({})).toEqual([]);
    expect(entries(obj)).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  test('isEmpty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(obj)).toBe(false);
  });

  test('tuple', () => {
    expect(tuple()).toEqual([]);
    expect(tuple(1, 2, 3)).toEqual([1, 2, 3]);
    expect(tuple(1, 'a', true, 3)).toEqual([1, 'a', true, 3]);
  });
});