import { EntryOf, ObjectKey, ValueOf } from '../utils/types';

/**
 * Typed wrapper for `Object.keys()`.
 * 
 * @param obj object to get the keys of.
 * 
 * @example
 * console.log(keys({})) // []
 * console.log(keys({ a: 1 })) // ['a']
 */
export const keys = <O extends object>(obj: O): (keyof O)[] => Object.keys(obj) as (keyof O)[];

/**
 * Typed wrapper for `Object.values()`.
 * 
 * @param obj object to get the values of.
 * 
 * @example
 * console.log(values({})) // []
 * console.log(values({ a: 1 })) // [1]
 */
export const values = <O extends object>(obj: O): ValueOf<O>[] => Object.values(obj) as ValueOf<O>[];

/**
 * Typed wrapper for `Object.entries()`.
 * 
 * @param obj object to get the entries of.
 * 
 * @example
 * console.log(entries({})) // []
 * console.log(entries({ a: 1 })) // ['a', 1]
 */
 export const entries = <O extends object>(obj: O): EntryOf<O>[] => Object.entries(obj) as EntryOf<O>[];

/**
 * Typed wrapper for `Object.fromEntries()`.
 * 
 * @param entries entries to form the object from.
 * 
 * @example
 * console.log(toObject([])) // {}
 * console.log(toObject(['a', 1])) // { a: 1 }
 */
export const toObject = <K extends ObjectKey, V>(entries: [K, V][]): Record<K, V> => Object.fromEntries(entries) as Record<K, V>;

/**
 * Checks is an object is empty, i.e. equal to {}.
 * 
 * An object `o` is considered *empty*, in this context, if (and only if) it has no enumerable keys,
 * that is if `Object.keys(o)` is an empty array.
 * 
 * @param obj the object to test for emptiness.
 * 
 * @example
 * console.log(isEmpty({})) // true
 * console.log(isEmpty({ a: 1 })) // false
 */
export const isEmpty = (obj: object) => keys(obj).length === 0;

/**
 * Creates a tuple containing the given args.
 * 
 * At runtime a "tuple" is simply an array; `tuple()`'s purpose is 
 * to have Typescript treat the data as a tuple type, not an array type.
 * 
 * In some cases, `tuple()` could be used to make the programmer's intent clearer.
 * 
 * @example 
 * const tup = tuple(1, 'a', true, 3);
 * 
 * // tup is of type [number, string, boolean, number]
 * console.log(tup); // [1, 'a', true, 3] 
 */
 export const tuple = <A extends any[]>(...args: A): A => args;