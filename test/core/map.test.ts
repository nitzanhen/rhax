import { map } from 'core';

const numbersObj = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 };

const numbersArr = Object.values(numbersObj);

describe('map', () => {
  test('map', () => {
    expect(map([], () => 0)).toEqual([]);

    expect(map(numbersArr, n => n)).toEqual(numbersArr);
    // Assert that it makes a new instance
    expect(map(numbersArr, n => n)).not.toBe(numbersArr);

    // Basic mappers

    expect(map(numbersArr, n => n + 1)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(map(numbersArr, n => String(n ** 2))).toEqual(['1', '4', '9', '16', '25', '36', '49', '64']);
    expect(map(numbersArr, n => n < 5)).toEqual([true, true, true, true, false, false, false, false]);

    // Mappers that use indices

    expect(map(numbersArr, (n, i) => n + i)).toEqual([1, 3, 5, 7, 9, 11, 13, 15]);
    expect(map(numbersArr, (n, i) => Math.max(n, 2 * i))).toEqual([1, 2, 4, 6, 8, 10, 12, 14]);
  });

  test('map (curried)', () => {
    expect(map(() => 0)([])).toEqual([]);

    expect(map(n => n)(numbersArr)).toEqual(numbersArr);
    // Assert that it makes a new instance
    expect(map(n => n)(numbersArr)).not.toBe(numbersArr);

    // Basic mappers

    expect(map((n: number) => n + 1)(numbersArr)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(map((n: number) => String(n ** 2))(numbersArr)).toEqual(['1', '4', '9', '16', '25', '36', '49', '64']);
    expect(map((n: number) => n < 5)(numbersArr)).toEqual([true, true, true, true, false, false, false, false]);

    // Mappers that use indices

    expect(map((n: number, i) => n + i)(numbersArr)).toEqual([1, 3, 5, 7, 9, 11, 13, 15]);
    expect(map((n: number, i) => Math.max(n, 2 * i))(numbersArr)).toEqual([1, 2, 4, 6, 8, 10, 12, 14]);
  });

  test('map.object', () => {
    expect(map.object({}, () => 0)).toEqual({});

    expect(map.object(numbersObj, n => n)).toEqual(numbersObj);
    // Assert that it makes a new instance
    expect(map.object(numbersObj, n => n)).not.toBe(numbersObj);

    // Basic mappers

    expect(map.object(numbersObj, n => n + 1)).toEqual({ 'a': 2, 'b': 3, 'c': 4, 'd': 5, 'e': 6, 'f': 7, 'g': 8, 'h': 9 });
    expect(map.object(numbersObj, n => String(n ** 2))).toEqual({ 'a': '1', 'b': '4', 'c': '9', 'd': '16', 'e': '25', 'f': '36', 'g': '49', 'h': '64' });
    expect(map.object(numbersObj, n => n < 5)).toEqual({ 'a': true, 'b': true, 'c': true, 'd': true, 'e': false, 'f': false, 'g': false, 'h': false });

    // Mappers that use indices

    expect(map.object(numbersObj, (n, k) => `${n}${k}`)).toEqual({ 'a': '1a', 'b': '2b', 'c': '3c', 'd': '4d', 'e': '5e', 'f': '6f', 'g': '7g', 'h': '8h' });
    expect(map.object(numbersObj, (n, k) => Math.max(n, k.charCodeAt(0)))).toEqual({ 'a': 97, 'b': 98, 'c': 99, 'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104 });
  });

  test('map.object (curried)', () => {
    expect(map.object({}, () => 0)).toEqual({});

    expect(map.object(n => n)(numbersObj)).toEqual(numbersObj);
    // Assert that it makes a new instance
    expect(map.object(n => n)(numbersObj)).not.toBe(numbersObj);

    // Basic mappers

    expect(map.object((n: number) => n + 1)(numbersObj)).toEqual({ 'a': 2, 'b': 3, 'c': 4, 'd': 5, 'e': 6, 'f': 7, 'g': 8, 'h': 9 });
    expect(map.object((n: number) => String(n ** 2))(numbersObj)).toEqual({ 'a': '1', 'b': '4', 'c': '9', 'd': '16', 'e': '25', 'f': '36', 'g': '49', 'h': '64' });
    expect(map.object((n: number) => n < 5)(numbersObj)).toEqual({ 'a': true, 'b': true, 'c': true, 'd': true, 'e': false, 'f': false, 'g': false, 'h': false });

    // Mappers that use indices

    expect(map.object((n: number, k: string) => `${n}${k}`)(numbersObj)).toEqual({ 'a': '1a', 'b': '2b', 'c': '3c', 'd': '4d', 'e': '5e', 'f': '6f', 'g': '7g', 'h': '8h' });
    expect(map.object((n: number, k: string) => Math.max(n, k.charCodeAt(0)))(numbersObj)).toEqual({ 'a': 97, 'b': 98, 'c': 99, 'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104 });
  });
});