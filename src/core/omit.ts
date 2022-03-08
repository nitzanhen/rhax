
import { ObjectKey } from '../utils/types';
import { filter } from './filter';

/**
 * Omits fields from an object by their keys. 
 * 
 * The result is a *new* object, whose fields are identical to the original object's fields, except for the fields
 * whose keys are passed to `omit` (which are omitted). 
 * 
 * @param obj the object to omit from.
 * @param keys keys to omit.
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4 };
 * const omitted = omit(obj, 'a', 'c');
 * console.log(omitted); // { b: 2, d: 4 }
 */
export function omit<O extends object, K extends keyof O>(obj: O, ...keys: K[]): Omit<O, K>;

/**
 * Curried variant of `omit`.
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4 };
 * const noB = omit('a', 'c');
 * console.log(typeof noB); // 'function'
 * 
 * const omitted = noB(obj);
 * console.log(omitted); // { b: 2, d: 4 }
 */
export function omit<K extends ObjectKey>(...keys: K[]): <O extends Record<K, any>>(obj: O) => Omit<O, K>;
export function omit(...args: any[]) {
  if (typeof args[0] !== 'object') {
    const keys = args;
    return (obj: any) => omit(obj, ...keys);
  }

  const [obj, ...keys] = args;
  const keySet = new Set(keys);

  return filter.object(obj, (_, k) => !keySet.has(k));
}