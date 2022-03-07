import { makeArray } from '../core/makeArray';
import { tuple } from './helpers';

export type Zipped<Arrs extends [...any[]]> = Arrs extends [(infer H)[], ...(infer T)]
  ? [H, ...Zipped<T>]
  : [];

export const zip = <Arrs extends any[][]>(...arrs: Arrs): Zipped<Arrs>[] =>
  makeArray(
    Math.min(...arrs.map(a => a.length)),
    i => tuple(...arrs.map(a => a[i])) as Zipped<Arrs>
  );