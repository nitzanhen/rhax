import { ValueOf } from '../../types';

export const filter = <O>(
  predicate: (value: ValueOf<O>, key: keyof O, record: O) => boolean, record: O
): Partial<O> =>
  (Object.entries(record) as [keyof O, ValueOf<O>][])
    //Filter entries by the predicate
    .filter(([k, v]) => predicate(v, k, record))
    //Reduce the entries array back to an object
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Partial<O>);