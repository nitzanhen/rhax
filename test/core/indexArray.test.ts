import { indexArray } from 'core';

describe('indexArray', () => {

  test('indexArray', () => {
    expect(indexArray([], () => 0)).toEqual({});

    expect(indexArray([true, false], Number)).toEqual({ 1: true, 0: false });
    expect(indexArray(['ab', 'cde'], str => str[0])).toEqual({ 'a': 'ab', 'c': 'cde' });

    expect(indexArray([1, 2], (n, i) => n + i)).toEqual({ 1: 1, 3: 2 });
  });

  test('indexArray (curried)', () => {
    expect(indexArray(() => 0)([])).toEqual({});

    expect(indexArray(Number)([true, false])).toEqual({ 1: true, 0: false });
    expect(indexArray((str: string) => str[0])(['ab', 'cde'])).toEqual({ 'a': 'ab', 'c': 'cde' });

    expect(indexArray((n: number, i) => n + i)([1, 2])).toEqual({ 1: 1, 3: 2 });
  });
});