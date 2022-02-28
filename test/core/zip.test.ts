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
  });
});