import { toObject } from 'core';

describe('toObject', () => {
  test('toObject', () => {
    expect(toObject([['a', 1], ['b', 2]])).toEqual({ a: 1, b: 2 });

    expect(toObject([[1, 'a'], [2, 'b']])).toEqual({ 1: 'a', 2: 'b' });

    const obj = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 };
    expect(toObject(Object.entries(obj)));
  });
});