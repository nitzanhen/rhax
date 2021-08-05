import { take } from 'Rhax';

describe('RhaxCommon', () => {
  test.skip('map', () => {
    /** @todo */
    // expect(
    //   take(10).map(x => x + 1)()
    // ).toBe(11);

    // expect(
    //   take(false).map(b => b || false)()
    // ).toBe(false);

    // expect(
    //   take('hello')
    //   .map(s => s + ' world')()
    // ).toBe('hello world');

    // expect(
    //   take('A very long string')
    //   .map(s => s.length)()
    // ).toBe(18);
  });

  test('also - fn gets called', () => {
    const values: unknown[] = [3, null, 1 < 2, {}, ['a', 'b', 'c'], take, 'value'];

    for (const val of values) {
      const cb = jest.fn();
      take(val).also(cb)();

      expect(cb).toHaveBeenCalledTimes(1);
    }
  });

  test('also - value in new Rhax strictly equals old value', () => {
    const values: unknown[] = [3, null, 1 < 2, {}, ['a', 'b', 'c'], take, 'value'];

    for (const val of values) {
      const cb = () => Math.random();
      const result = take(val).also(cb)();

      expect(result).toBe(val);
    }
  });

  test('default', () => {
    const uniqueSymbol = Symbol();
    const nonNullValues = [3, 1 < 2, {}, ['a', 'b', 'c'], take, 'value'];
    const nullValues = [undefined, null];

    for (const value of nonNullValues) {
      expect(
        take(value).default(uniqueSymbol)()
      ).toBe(value);
    }

    for (const value of nullValues) {
      expect(
        take(value).default(uniqueSymbol)()
      )
        .toBe(uniqueSymbol);
    }
  });

  test('cast', () => {
    const obj = { a: 3, b: 4 };
    expect(
      take(obj).cast<Record<string, number>>()()
    ).toBe<Record<string, number>>(obj);

    const arr = [1, 2, 3] as const;
    expect(
      take(arr).cast<[1, 2, 3]>()()
    ).toBe(arr as [1, 2, 3]);

    const maybe = 5 as number | null;
    expect(
      take(maybe)
        .cast<number>()
        .clamp(1, 2)
        ()
    ).toBe(2);
  });
});