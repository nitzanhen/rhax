import { ObjectKey } from '../utils/types';
import { toObject, tuple } from './helpers';

/**
 * Picks fields from an object by their keys, into a new object.
 * 
 * The result is a *new* object, whose fields are exactly those fields of the original object 
 * whose keys were passed to `pick`.
 * 
 * @param obj the object to pick from.
 * @param keys the keys to pick.
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4 };
 * const picked = pick(obj, 'a', 'c');
 * console.log(omitted); // { a: 1, c: 3 }
 */
export function pick<O extends object, K extends keyof O>(obj: O, ...keys: K[]): Pick<O, K>;

/**
 * Curried variant of `pick`.
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4 };
 * const onlyAC = pick('a', 'c');
 * console.log(typeof onlyAC); // 'function'
 * 
 * const picked = onlyAC(obj);
 * console.log(picked); // { b: 2, d: 4 }
 */
export function pick<K extends ObjectKey>(...keys: K[]): <O extends Record<K, any>>(obj: O) => Pick<O, K>;
export function pick(...args: any[]) {
  if (typeof args[0] !== 'object') {
    const keys = args;
    return (obj: any) => pick(obj, ...keys);
  }

  const [obj, ...keys] = args;
  return toObject(
    keys.map(k => tuple(k, obj[k]))
  );
}