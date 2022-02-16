
import { ValueOf } from '../utils/types';
import { entries } from './helpers';
import { toObject } from './toObject';

export type ArrayPredicate<E> = (el: E, index: number) => boolean;
export type ObjectPredicate<O extends object> = (value: ValueOf<O>, key: keyof O) => boolean;

export function filter<E>(arr: E[], predicate: ArrayPredicate<E>): E[];
export function filter<E>(predicate: ArrayPredicate<E>): (arr: E[]) => E[];
export function filter(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const predicate = args[0];
    return (arr: any[]) => filter(arr, predicate);
  }

  const [arr, predicate] = args;
  return arr.filter(predicate);
}

export function filterObject<O extends object>(obj: O, predicate: ObjectPredicate<O>): O;
export function filterObject<O extends object>(predicate: ObjectPredicate<O>): (obj: O) => O;
export function filterObject(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const predicate = args[0];
    return (obj: any) => filter(obj, predicate);
  }

  const [obj, predicate] = args;
  return toObject(
    entries(obj).filter(([k, v]) => predicate(v, k))
  );
}

filter.object = filterObject;