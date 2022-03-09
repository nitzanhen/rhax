import { filter } from 'core';

const numbersObj = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 };

const numbersArr = Object.values(numbersObj);

describe('filter', () => {
  test('filter', () => {
    expect(filter([], () => true)).toEqual([]);

    expect(filter(numbersArr, () => true)).toEqual(numbersArr);
    // Assert that it makes a new instance
    expect(filter(numbersArr, () => true)).not.toBe(numbersArr);

    // Basic predicates

    expect(filter(numbersArr, n => n % 2 == 0)).toEqual([2, 4, 6, 8]);
    expect(filter(numbersArr, n => n < 2 || n >= 5)).toEqual([1, 5, 6, 7, 8]);
    expect(filter(numbersArr, n => n > 10)).toEqual([]);

    // Predicates that use indices

    expect(filter(numbersArr, (n, i) => (n + i) % 2 == 0)).toEqual([]);
    expect(filter(numbersArr, (n, i) => (n + i) % 3 == 0)).toEqual([2, 5, 8]);
  });

  test('filter (curried)', () => {
    expect(filter(() => true)([])).toEqual([]);

    expect(filter(() => true)(numbersArr)).toEqual(numbersArr);
    // Assert that it makes a new instance
    expect(filter(() => true)(numbersArr)).not.toBe(numbersArr);

    // Basic predicates

    expect(filter((n: number) => n % 2 == 0)(numbersArr)).toEqual([2, 4, 6, 8]);
    expect(filter((n: number) => n < 2 || n >= 5)(numbersArr)).toEqual([1, 5, 6, 7, 8]);
    expect(filter((n: number) => n > 10)(numbersArr)).toEqual([]);

    // Predicates that use indices

    expect(filter((n: number, i) => (n + i) % 2 == 0)(numbersArr)).toEqual([]);
    expect(filter((n: number, i) => (n + i) % 3 == 0)(numbersArr)).toEqual([2, 5, 8]);
  });

  test('filter.object', () => {
    expect(filter.object({}, () => true)).toEqual({});

    expect(filter.object(numbersObj, () => true)).toEqual(numbersObj);
    // Assert that it makes a new instance
    expect(filter.object(numbersObj, () => true)).not.toBe(numbersObj);

    // Basic predicates

    expect(filter.object(numbersObj, n => n % 2 == 0)).toEqual({ 'b': 2, 'd': 4, 'f': 6, 'h': 8 });
    expect(filter.object(numbersObj, n => n < 2 || n >= 5)).toEqual({ 'a': 1, 'e': 5, 'f': 6, 'g': 7, 'h': 8 });
    expect(filter.object(numbersObj, n => n > 10)).toEqual({ });
  
    // Predicates that use keys
  
    expect(filter.object(numbersObj, (n, k) => (n % 2 == 0) && (k === k.toUpperCase()))).toEqual({});
    expect(filter.object(numbersObj, (n, k) => (n % 2 == 0) && (k <= 'd'))).toEqual({ 'b': 2, 'd': 4 });
  });

  test('filter.object (curried)', () => {
    expect(filter.object(() => true)({})).toEqual({});

    expect(filter.object(() => true)(numbersObj)).toEqual(numbersObj);
    // Assert that it makes a new instance
    expect(filter.object(() => true)(numbersObj)).not.toBe(numbersObj);

    // Basic predicates

    expect(filter.object((n: number) => n % 2 == 0)(numbersObj)).toEqual({ 'b': 2, 'd': 4, 'f': 6, 'h': 8 });
    expect(filter.object((n: number) => n < 2 || n >= 5)(numbersObj)).toEqual({ 'a': 1, 'e': 5, 'f': 6, 'g': 7, 'h': 8 });
    expect(filter.object((n: number) => n > 10)(numbersObj)).toEqual({ });
  
    // Predicates that use keys
  
    expect(filter.object((n: number, k: string) => (n % 2 == 0) && (k === k.toUpperCase()))(numbersObj)).toEqual({});
    expect(filter.object((n: number, k: string) => (n % 2 == 0) && (k <= 'd'))(numbersObj)).toEqual({ 'b': 2, 'd': 4 });
  });
});