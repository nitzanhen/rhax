import { zip } from 'core';

describe('zip', () => {
  test('zip', () => {

    expect(
      zip([1, 2, 3, 4], ['a', 'b', 'c', 'd'])
    ).toEqual([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]);

    expect(zip([], [])).toEqual([]);


    expect(
      zip([1, 2], ['a', 'b', 'c', 'd'])
    ).toEqual([[1, 'a'], [2, 'b']]);

    expect(
      zip([], ['a', 'b', 'c', 'd'])
    ).toEqual([]);


    expect(
      zip([1, 2, 3, 4], ['a', 'b', 'c'])
    ).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);

    expect(
      zip([1, 2, 3, 4], [])
    ).toEqual([]);

    expect(
      zip(['a'], ['b'], ['c'], ['d'])
    ).toEqual([['a', 'b', 'c', 'd']]);

    expect(
      zip(['a', 'b', 'c', 'd'], [1, 2, 3, 4, 5], [[1], [2], [3], [4]], [true, false])
    ).toEqual([['a', 1, [1], true], ['b', 2, [2], false]]);
  });
});