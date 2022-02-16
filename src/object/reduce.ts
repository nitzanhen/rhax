import { ValueOf } from '../utils/types';
import { entries } from './helpers';

export type ArrayReducer<E, A> = (acc: A, el: E, index: number) => A;
export type ObjectReducer<O extends object, A> = (acc: A, value: ValueOf<O>, key: keyof O) => A;

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
    : arr.reduce(reducer, initialValue);
}


export const reduceObject = <O extends object, A>(obj: O, reducer: ObjectReducer<O, A>, initialValue: A): A => {
  const objEntries = entries(obj);
  if (objEntries.length === 0) {
    return initialValue;
  }

  return objEntries.reduce(
    (acc, [k, v]) => reducer(acc, v, k),
    initialValue
  );
};