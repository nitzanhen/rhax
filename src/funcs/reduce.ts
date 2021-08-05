import { ElementOf, RecordOrArray, ValueOf } from '../utils/types';

export type RecordReducer<O, A> = (acc: A, value: ValueOf<O>, key: keyof O) => A;
export type ArrayReducer<E, A> = (acc: A, element: E, index: number) => A;
export type Reducer<C extends RecordOrArray, A> = C extends (infer E)[] ? ArrayReducer<E, A> : RecordReducer<C, A>;

export function reduce<E, A>(reducer: ArrayReducer<E, A>, initialValue: A, array: E[]): A;
export function reduce<C extends Record<string, unknown>, A>(reducer: RecordReducer<C, A>, initialValue: A, record: C): A;
export function reduce<C extends RecordOrArray, A>(reducer: Reducer<C, A>, initialValue: A): C extends (infer E)[] ? ((array: E[]) => A) : (record: C) => A;

export function reduce<C extends RecordOrArray, A>(
  reducer: Reducer<C, A>,
  initialValue: A,
  recordOrArray?: C
) {
  if (arguments.length < 2) {
    return (collection: C) => reduce(reducer as any, initialValue, collection as any);
  }

  if (Array.isArray(recordOrArray)) {
    return recordOrArray.length === 0
      ? initialValue
      : recordOrArray.reduce(reducer as ArrayReducer<ElementOf<C>, A>, initialValue);
  }

  return (Object.entries(recordOrArray!) as [keyof C, ValueOf<C>][])
    //Reduce using the reducer argument
    .reduce((acc, [k, v]) => (reducer as RecordReducer<C, A>)(acc, v, k), initialValue);
}
