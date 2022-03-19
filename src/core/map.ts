
import { ObjectKey, ValueOf } from '../utils/types';
import { entries, toObject, tuple } from '../core/helpers';

export type ArrayMapper<E, W> = (el: E, index: number) => W;
export type ObjectMapper<K extends ObjectKey, V, W> = (value: V, key: K) => W;

/**
 * Maps an array using a given mapper.
 * 
 * Like `Array.prototype.map()`, the result is another array of the same length, whose elements are determined by `mapper`.
 * That is, for an array `arr`, `map(arr, mappper)` is another array, and its i-th elements
 * is evaluated as `mapper(arr[i], i)`.
 *  
 * @param arr the array to transform.
 * @param mapper the function to map with.
 * 
 * @example
 * const doubled = map([1, 2, 3, 4], n => n **2);
 * console.log(doubled); // [1, 4, 9, 16]
 */
export function map<E, W>(arr: E[], mapper: ArrayMapper<E, W>): W[];

/**
 * Curried variant of `map()`.
 * 
 * @example
 * const double = map((n: number) => n **2)
 * console.log(typeof double) // 'function'
 * console.log(double([1, 2, 3, 4])) // [1, 4, 9, 16]
 */
export function map<E, W>(mapper: ArrayMapper<E, W>): (arr: E[]) => W[];
export function map(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const mapper = args[0];
    return (arr: any) => map(arr, mapper);
  }

  const [arr, mapper] = args;
  return arr.map(mapper);
}

/**
 * Maps an object's values using a given mapper.
 * 
 * The result is another record, with the same keys, whose values are determined by `mapper`.
 * That is, for a record `obj`, `map(obj, mappper)` is another record, and for each entry `k: v` in `obj`,
 * it will have an entry `k: w` with `w = mapper(v, k)`.
 *  
 * @param obj the object to transform.
 * @param mapper the function to map with.
 * 
 * @example
 * const doubled = map.object({ a: 1, b: 2 }, n => n **2);
 * console.log(doubled); // { a: 1, b: 4 }
 */
function mapObject<O extends object, W>(obj: O, mapper: ObjectMapper<keyof O, ValueOf<O>, W>): Record<keyof O, W>;

/**
 * Curried variant of `map.object()`.
 * 
 * @example
 * const double = map.object((n: number) => n **2);
 * console.log(typeof double); // 'function'
 * console.log(double({ a: 1, b: 2 })); // { a: 1, b: 4 }
 */
function mapObject<K extends ObjectKey, V, W>(mapper: ObjectMapper<K, V, W>): <O extends Record<K, V>>(obj: O) => Record<keyof O, W>;
function mapObject(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const mapper = args[0];
    return (obj: any) => mapObject(obj, mapper);
  }

  const [obj, mapper] = args;
  return toObject(
    entries(obj).map(([k, v]) => tuple(k, mapper(v, k)))
  );
}

map.object = mapObject;