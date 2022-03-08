import { EntryOf, ValueOf } from '../utils/types';
import { entries } from './helpers';

/** @todo */
/** @private */

export type ObjectQuery<O extends object> = (value: ValueOf<O>, key: keyof O) => boolean

/** @todo */
/** @private */

export const find = <O extends object>(obj: O, query: ObjectQuery<O>): ValueOf<O> | undefined =>
  entries(obj).find(([k, v]) => query(v, k))?.[1];

/** @todo */
/** @private */

export const findKey = <O extends object>(obj: O, query: ObjectQuery<O>): (keyof O) | undefined =>
  entries(obj).find(([k, v]) => query(v, k))?.[0];

/** @todo */
/** @private */

export const findEntry = <O extends object>(obj: O, query: ObjectQuery<O>): EntryOf<O> | undefined =>
  entries(obj).find(([k, v]) => query(v, k));