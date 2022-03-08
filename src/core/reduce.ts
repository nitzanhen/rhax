import { ObjectKey, ValueOf } from '../utils/types';
import { entries } from '../core/helpers';

export type ArrayReducer<E, A> = (acc: A, el: E, index: number) => A;
export type ObjectReducer<K extends ObjectKey, V, A> = (acc: A, value: V, key: K) => A;

/**
 * Aggregates an array using a given reducer, starting with a given initial value.
 * 
 * Like `Array.prototype.reduce`, this function initializes an accumulator `acc`, initialized to be
 * the passed `initialValue`. Then, it iterates over the given array `arr`, and for each element `e` (at index `i`), it
 * "reduces" `e` into `acc` by setting `acc = reducer(acc, e, i)`.
 * 
 * Unlike `Array.prototype.reduce`, here the `initialValue` is a *required* argument, as its type is required
 * for `reduce`'s typing, and also to avoid the edge case of trying to reduce an empty array with no initial value
 * (in `Array.prototype.reduce`, for example, this causes a TypeError to be thrown).
 * 
 * @param arr the array to aggregate. 
 * @param reducer the reducer to aggregate with.
 * @param initialValue the value to start from.
 * 
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const product = reduce(arr, (acc, n) => acc * n, 1);
 * console.log(product); // 120
 */
export function reduce<E, A>(arr: E[], reducer: ArrayReducer<E, A>, initialValue: A): A;

/**
 * Curried variant of `reduce`.
 * 
 * @example
 * const productOf = reduce((acc, n: number) => acc * n, 1);
 * console.log(typeof productOf); // 'function'
 * 
 * const arr = [1, 2, 3, 4, 5];
 * const product = productOf(arr);
 * console.log(product); // 120
 */
export function reduce<E, A>(reducer: ArrayReducer<E, A>, initialValue: A): (arr: E[]) => A;
export function reduce(...args: any[]) {
  if (args.length <= 2 && typeof args[0] === 'function') {
    const [reducer, initialValue] = args;
    return (arr: any[]) => reduce(arr, reducer, initialValue);
  }

  const [arr, reducer, initialValue] = args;
  return arr.length === 0
    ? initialValue
    : (arr as any[]).reduce(
      (acc, v, k) => reducer(acc, v, k),
      initialValue
    );
}

/**
 * Aggregates a record using a given reducer, starting with a given initial value.
 * 
 * Similar to `Array.prototype.reduce`, this function initializes an accumulator `acc`, initialized to be
 * the passed `initialValue`. Then, it iterates over the fields of the given record `obj`, and for each entry `k: v`, it
 * "reduces" it into `acc` by setting `acc = reducer(acc, v, k)`.
 * 
 * Unlike `Array.prototype.reduce`, here the `initialValue` is a *required* argument, as its type is required
 * for `reduce.object`'s typing, and also to avoid the edge case of trying to reduce an empty collection with no initial value
 * (in `Array.prototype.reduce`, for example, this causes a TypeError to be thrown).
 * 
 * @param obj the record to aggregate. 
 * @param reducer the reducer to aggregate with.
 * @param initialValue the value to start from.
 * 
 * @example
 * const arrs = { 0: [0, 3, 6], 1: [1, 4, 7], 2: [2, 5, 8] }
 * const allNums = reduce(arrs, (acc, nums) => [...acc, ...nums], []);
 * console.log(allNums); // [0, 3, 6, 1, 4, 7, 2, 5, 8]
 */
function reduceObject<O extends Object, A>(obj: O, reducer: ObjectReducer<keyof O, ValueOf<O>, A>, initialValue: A): A;

/**
 * Curried variant of `reduce.object`.
 * 
 * @example
 * const flatten = reduce((acc, nums: number[]) => [...acc, ...nums], [] as number[]);
 * console.log(typeof flatten); // 'function'
 * 
 * const arrs = { 0: [0, 3, 6], 1: [1, 4, 7], 2: [2, 5, 8] }
 * const allNums = flatten(arrs);
 * console.log(allNums); // [0, 3, 6, 1, 4, 7, 2, 5, 8]
 */
function reduceObject<K extends ObjectKey, V, A>(reducer: ObjectReducer<K, V, A>, initialValue: A): <O extends Record<K ,V>>(obj: O) => A;
function reduceObject(...args: any[]) {
  if (args.length <= 2 && typeof args[0] === 'function') {
    const [reducer, initialValue] = args;
    return (obj: object) => reduceObject(obj, reducer, initialValue);
  }

  const [obj, reducer, initialValue] = args;
  const objEntries = entries(obj);

  return objEntries.length === 0
    ? initialValue
    : objEntries.reduce(
      (acc, [k, v]) => reducer(acc, v, k),
      initialValue
    );
}

reduce.object = reduceObject;