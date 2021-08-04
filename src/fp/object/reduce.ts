import { ElementOf, RecordOrArray, ValueOf } from '../../utils/types';

export type RecordReducer<O, A> = (acc: A, value: ValueOf<O>, key: keyof O) => A;
export type ArrayReducer<E, A> = (acc: A, element: E, index: number) => A;
export type Reducer<C extends RecordOrArray, A> = C extends (infer E)[] ? ArrayReducer<E, A> : RecordReducer<C, A>;

export function reduce<C extends RecordOrArray, A>(reducer: Reducer<C, A>, initialValue: A, collection: C): A;
export function reduce<C extends RecordOrArray, A>(
  reducer: Reducer<C, A>,
  initialValue: A
): C extends (infer E)[] ? (array: E[]) => A : (record: C) => A;

export function reduce<C extends RecordOrArray, A>(
  reducer: Reducer<C, A>,
  initialValue: A,
  recordOrArray?: C
) {
  if (arguments.length < 2) {
    return (collection: C) => reduce(reducer as any, initialValue, collection);
  }

  if (Array.isArray(recordOrArray)) {
    type E = ElementOf<C>;
    return recordOrArray.length === 0
      ? initialValue
      : recordOrArray.reduce(reducer as ArrayReducer<E, A>, initialValue);
  }

  return (Object.entries(recordOrArray!) as [keyof C, ValueOf<C>][])
    //Reduce using the reducer argument
    .reduce((acc, [k, v]) => (reducer as RecordReducer<C, A>)(acc, v, k), initialValue);
}
