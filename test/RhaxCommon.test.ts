import { take } from 'Rhax';

describe('RhaxCommon', () => {
  /*   test('map', () => {
  
    }); */

  test('also - fn gets called', () => {
    const values: unknown[] = [3, null, 1 < 2, {}, ['a', 'b', 'c'], take, 'value'];

    for (const val of values) {
      const cb = jest.fn();
      console.log(take(val));
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

  /*   test('default', () => {
  
    }); */
});