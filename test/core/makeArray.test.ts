import { makeArray } from 'core';

describe('makeArray', () => {
  test('makeArray', () => {
    expect(makeArray(0, i => i)).toEqual([]);
    expect(makeArray(0)).toEqual([]);
    expect(makeArray(3, i => i)).toEqual([0, 1, 2]);
    expect(makeArray(3)).toEqual([0, 1, 2]);

    expect(makeArray(5, () => ({}))).toEqual([{}, {}, {}, {}, {}]);
  });
});