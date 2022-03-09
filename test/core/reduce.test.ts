import { reduce } from 'core';

const sym = Symbol('unique symbol');
const items = [
  { a: 6, b: -13 },
  { a: 4, b: 19 },
  { a: 19, b: -17 },
  { a: -7, b: -6 },
  { a: -6, b: 8 },
  { a: -13, b: -14 },
  { a: -1, b: 20 },
  { a: -16, b: 3 },
];
type Item = typeof items[0]

const obj = { a: 1, b: 2, c: 3 };

describe('reduce', () => {

  test('reduce', () => {
    expect(reduce([], (_, v) => v, sym)).toBe(sym);

    // Basic reducers

    expect(reduce(items, (sum, { a, b }) => sum + (a - b), 0)).toBe(-14);
    expect(reduce(items, (acc, { a, b }) => [...acc, { a: b, b: a }], [] as Item[])).toEqual([
      { b: 6, a: -13 },
      { b: 4, a: 19 },
      { b: 19, a: -17 },
      { b: -7, a: -6 },
      { b: -6, a: 8 },
      { b: -13, a: -14 },
      { b: -1, a: 20 },
      { b: -16, a: 3 },
    ]);

    // Reducers that use index

    expect(reduce(items, (sum, { a, b }, i) => (i % 2 === 0) ? sum + (a - b) : sum, 0)).toBe(20);
    expect(reduce(items, (acc, { a, b }, i) => i < 4 ? [...acc, { a: b, b: a }] : acc, [] as Item[])).toEqual([
      { b: 6, a: -13 },
      { b: 4, a: 19 },
      { b: 19, a: -17 },
      { b: -7, a: -6 },
    ]);
  });

  test('reduce (curried)', () => {
    expect(reduce((_, v: any) => v, sym)([])).toBe(sym);

    // Basic reducers

    expect(reduce((sum, { a, b }) => sum + (a - b), 0)(items)).toBe(-14);
    expect(reduce((acc, { a, b }) => [...acc, { a: b, b: a }], [] as Item[])(items)).toEqual([
      { b: 6, a: -13 },
      { b: 4, a: 19 },
      { b: 19, a: -17 },
      { b: -7, a: -6 },
      { b: -6, a: 8 },
      { b: -13, a: -14 },
      { b: -1, a: 20 },
      { b: -16, a: 3 },
    ]);

    // Reducers that use index

    expect(reduce((sum, { a, b }, i) => (i % 2 === 0) ? sum + (a - b) : sum, 0)(items)).toBe(20);
    expect(reduce((acc, { a, b }, i) => i < 4 ? [...acc, { a: b, b: a }] : acc, [] as Item[])(items)).toEqual([
      { b: 6, a: -13 },
      { b: 4, a: 19 },
      { b: 19, a: -17 },
      { b: -7, a: -6 },
    ]);
  });

  test('reduce.object', () => {
    expect(reduce.object({}, (_, v: any) => v, sym)).toBe(sym);

    // Basic reducers

    expect(reduce.object(obj, (product, n) => product * n, 1)).toBe(6);
    expect(reduce.object(obj, (_, n) => n, 0)).toBe(3);

    // Reducers that use key

    expect(reduce.object(obj, (str, n, key) => str + key.repeat(n), '')).toBe('abbccc');
    expect(reduce.object(obj, (str, n, key) => str + n + key, '')).toBe('1a2b3c');
  });

  test('reduce.object (curried)', () => {
    expect(reduce.object((_, v: any) => v, sym)({})).toBe(sym);

    // Basic reducers

    expect(reduce.object((product, n: number) => product * n, 1)(obj)).toBe(6);
    expect(reduce.object((_, n: number) => n, 0)(obj)).toBe(3);

    // Reducers that use key

    expect(reduce.object((str, n: number, key: string) => str + key.repeat(n), '')(obj)).toBe('abbccc');
    expect(reduce.object<string, number, string>((str, n, key) => str + n + key, '')(obj)).toBe('1a2b3c');
  });
});