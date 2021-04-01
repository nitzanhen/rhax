import { ValueOf } from '../../types';

export const find = <O extends Record<string, unknown>>(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean, record: O) =>
  (Object.entries(record) as [keyof O, ValueOf<O>][])
    .find(([k, v]) => query(v, k, record))?.[1];