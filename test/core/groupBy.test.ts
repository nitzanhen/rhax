import { groupBy } from 'core';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

describe('groupBy', () => {

  test('groupBy', () => {
    expect(groupBy([], () => 0)).toEqual({});

    expect(groupBy(numbers, () => 'a')).toEqual({ a: numbers });

    expect(groupBy(numbers, n => n % 3)).toEqual({
      0: [0, 3, 6],
      1: [1, 4, 7],
      2: [2, 5, 8]
    });

    expect(groupBy(numbers, n => (n < 3 || n === 6) ? 'true' : 'false')).toEqual({
      true: [0, 1, 2, 6],
      false: [3, 4, 5, 7, 8]
    });

    expect(groupBy(numbers, (n, i) => (n + i) % 3)).toEqual({
      0: [0, 3, 6],
      1: [2, 5, 8],
      2: [1, 4, 7]
    });

    // With Initial groups

    expect(groupBy([], () => 0, { 0: [] })).toEqual({ 0: [] });

    expect(groupBy(numbers, () => 'a' as string, { b: [] })).toEqual({ a: numbers, b: [] });

    expect(groupBy(numbers, n => n % 3, { 0: [], 1: [], 2: [] })).toEqual({
      0: [0, 3, 6],
      1: [1, 4, 7],
      2: [2, 5, 8]
    });

    expect(groupBy(numbers, n => (n < 3 || n === 6) ? 'true' : 'false' as string, { maybe: [] })).toEqual({
      true: [0, 1, 2, 6],
      false: [3, 4, 5, 7, 8],
      maybe: []
    });

  });

  test('groupBy (curried)', () => {
    expect(groupBy(() => 0)([])).toEqual({});

    expect(groupBy(() => 'a')(numbers)).toEqual({ a: numbers });

    expect(groupBy((n: number) => n % 3)(numbers)).toEqual({
      0: [0, 3, 6],
      1: [1, 4, 7],
      2: [2, 5, 8]
    });

    expect(groupBy((n: number) => (n < 3 || n === 6) ? 'true' : 'false')(numbers)).toEqual({
      true: [0, 1, 2, 6],
      false: [3, 4, 5, 7, 8]
    });

    expect(groupBy((n: number, i) => (n + i) % 3)(numbers)).toEqual({
      0: [0, 3, 6],
      1: [2, 5, 8],
      2: [1, 4, 7]
    });

    // With Initial groups

    expect(groupBy(() => 0, { 0: [] })([])).toEqual({ 0: [] });

    expect(groupBy<number, string>(() => 'a', { b: [] })(numbers)).toEqual({ a: numbers, b: [] });

    expect(groupBy((n: number) => n % 3, { 0: [], 1: [], 2: [] })(numbers)).toEqual({
      0: [0, 3, 6],
      1: [1, 4, 7],
      2: [2, 5, 8]
    });

    expect(groupBy((n: number) => (n < 3 || n === 6) ? 'true' : 'false' as string, { maybe: [] })(numbers)).toEqual({
      true: [0, 1, 2, 6],
      false: [3, 4, 5, 7, 8],
      maybe: []
    });

  });
});