import { makeArray } from '../core/makeArray';
import { tuple } from './helpers';

export type Zipped<Arrs extends [...any[]]> = Arrs extends [(infer H)[], ...(infer T)]
  ? [H, ...Zipped<T>]
  : [];

/**
 * 
 * 
 * @param arrs arrays to zip. 
 * 
 * @example
 * const zipped = zip([1, 2], ['a', 'b'], ['c', 'd']);
 * 
 * // zipped is of type [number, string, string][]
 * console.log(zipped); // [[1, 'a', 'c'], [2, 'b', 'd']];
 */
export const zip = <Arrs extends any[][]>(...arrs: Arrs): Zipped<Arrs>[] =>
  makeArray(
    Math.min(...arrs.map(a => a.length)),
    i => tuple(...arrs.map(a => a[i])) as Zipped<Arrs>
  );