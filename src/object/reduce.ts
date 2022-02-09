import { ValueOf } from '../utils/types';
import { entries } from './helpers';

export type ObjectReducer<O extends object, A> = (acc: A, value: ValueOf<O>, key: keyof O) => A

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