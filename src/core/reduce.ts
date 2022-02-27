import { ObjectKey, ValueOf } from '../utils/types';
import { entries } from '../core/helpers';

export type ArrayReducer<E, A> = (acc: A, el: E, index: number) => A;
export type ObjectReducer<K extends ObjectKey, V, A> = (acc: A, value: V, key: K) => A;

export function reduce<E, A>(arr: E[], reducer: ArrayReducer<E, A>, initialValue: A): A;
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

function reduceObject<O extends Object, A>(obj: O, reducer: ObjectReducer<keyof O, ValueOf<O>, A>, initialValue: A): A;
function reduceObject<K extends ObjectKey, V, A>(reducer: ObjectReducer<K, V, A>, initialValue: A): A;
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