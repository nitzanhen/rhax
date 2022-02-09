import { toObject } from '../array';
import { ValueOf } from '../utils/types';
import { entries } from './helpers';


export type ObjectPredicate<O extends object> = (value: ValueOf<O>, key: keyof O) => boolean;

export const filterObject = <O extends object>(obj: O, predicate: ObjectPredicate<O>): O =>
  toObject(entries(obj).filter(([k, v]) => predicate(v, k))) as O;