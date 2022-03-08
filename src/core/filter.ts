
import { ObjectKey, ValueOf } from '../utils/types';
import { entries, toObject } from './helpers';

export type ArrayPredicate<E> = (el: E, index: number) => boolean;
export type ObjectPredicate<K extends ObjectKey, V> = (value: V, key: K) => boolean;

/**
 * Filters an array using a given predicate.
 * 
 * Like `Array.prototype.filter()`, the result is another record, whose entries are the key-value pairs for which the predicate returned `true`.
 *  
 * @param arr the array to filter.
 * @param predicate the predicate to filter by.
 */
export function filter<E>(arr: E[], predicate: ArrayPredicate<E>): E[];

/**
 * Curried variant of `filter`
 */
export function filter<E>(predicate: ArrayPredicate<E>): (arr: E[]) => E[];
export function filter(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const predicate = args[0];
    return (arr: any[]) => filter(arr, predicate);
  }

  const [arr, predicate] = args;

  return arr.filter(predicate);
}

/**
 * Filters a record by a given predicate. 
 * 
 * The result is another record, whose entries are the key-value pairs for which the predicate returned `true`.
 * 
 * @param obj the object to filter.
 * @param predicate the predicate to filter by. 
 */
function filterObject<O extends object>(obj: O, predicate: ObjectPredicate<keyof O, ValueOf<O>>): O;

/**
 * Curried variant of `filter.object()`.
 */
function filterObject<K extends ObjectKey, V>(predicate: ObjectPredicate<K, V>): <O extends Record<K, V>>(obj: O) => O;
function filterObject(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const predicate = args[0];
    return (obj: any) => filterObject(obj, predicate);
  }

  const [obj, predicate] = args;
  return toObject(
    entries(obj).filter(([k, v]) => predicate(v, k))
  );
}

filter.object = filterObject;