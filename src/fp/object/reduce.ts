import { ValueOf } from 'utils/types';

export const reduce = <O, A = ValueOf<O>>
  (
    reducer: (acc: A, value: ValueOf<O>, key: keyof O, record: O) => A, initialValue: A, record: O
  ) =>
  (Object.entries(record) as [keyof O, ValueOf<O>][])
    //Reduce using the reducer argument
    .reduce((acc, [k, v]) => reducer(acc, v, k, record), initialValue);