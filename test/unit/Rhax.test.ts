import { Rhax, rhax, take } from 'Rhax';
import { RhaxCommon } from 'RhaxCommon';
import { RhaxNumber } from 'RhaxNumber';
import { RhaxObject } from 'RhaxObject';

describe('Rhax', () => {
  test('take() and rhax() are aliases', () => {
    expect(take).toBe(rhax);
  });

  test('The value returned from rhax is an instance of Rhax', () => {
    const r = rhax('value');
    expect(typeof r).toBe('function');
  });

  test('take(val)() strictly equals val', () => {
    expect(take(3)()).toBe(3);

    expect(take(null)()).toBe(null);

    expect(take(1 < 2)()).toBe(true);

    // Strict equality tests
    const o = {};
    expect(take(o)()).toBe(o);

    const arr = ['a', 'b', 'c'];
    expect(take(arr)()).toBe(arr);

    expect(take(take)()).toBe(take);
  });

  test('take(val) always has all methods of RhaxCommon', () => {
    const values: unknown[] = [3, null, 1 < 2, {}, ['a', 'b', 'c'], take, 'value'];

    for (const val of values) {
      const r = take(val);
      for (const [key, method] of Object.entries(RhaxCommon.prototype)) {
        expect(key in r).toBe(true);
        expect(r[key as keyof Rhax<any>]).toBe(method);
      }
    }
  });

  test('take(number) has all methods of RhaxNumber', () => {
    const numbers = [4, 0, -1, Math.PI, Infinity];

    for (const num of numbers) {
      const r = take(num);
      for (const [key, method] of Object.entries(RhaxNumber.prototype)) {
        expect(key in r).toBe(true);
        expect(r[key as keyof Rhax<any>]).toBe(method);
      }
    }
  });

  test("take(val) has no methods from RhaxNumber if val isn't a number", () => {
    const nonNumbers = [null, false, {}, [1, 2, 3], undefined, take, '3'];

    for (const val of nonNumbers) {
      const r = take(val);
      for (const key in RhaxNumber.prototype) {
        expect(key in r).toBe(false);
      }
    }
  });

  test('take(obj) has all methods of RhaxObject', () => {
    const objects = [{}, Object.create({}), { a: 3 }];

    for (const obj of objects) {
      const r = take(obj);
      for (const [key, method] of Object.entries(RhaxObject.prototype)) {
        expect(key in r).toBe(true);
        expect(r[key as keyof Rhax<any>]).toBe(method);
      }
    }
  });

  test("take(val) has no methods from RhaxObject if val isn't an object", () => {
    const nonObjects = [3, true, false, '3', [3]];

    for (const val of nonObjects) {
      const r = take(val);
      for (const key in RhaxObject.prototype) {
        expect(key in r).toBe(false);
      }
    }
  });

  /** @todo similar methods for RhaxArray */
});