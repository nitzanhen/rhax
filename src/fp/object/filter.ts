import { RecordKey, ValueOf } from '../../utils/types';

export function filter<K extends RecordKey, V>(
  predicate: (value: V, key: K) => boolean
): <O extends Record<K, V>>(record: O) => Partial<O>;

export function filter<O>(
  predicate: (value: ValueOf<O>, key: keyof O) => boolean
): (record: O) => Partial<O>;

export function filter<O>(
  predicate: (value: ValueOf<O>, key: keyof O) => boolean,
  record: O
): Partial<O>;

export function filter<O>(
  predicate: (value: ValueOf<O>, key: keyof O) => boolean, record?: O
) {
  if (record === undefined) {
    return (record: O) => filter(predicate, record);
  }

  return (Object.entries(record) as [keyof O, ValueOf<O>][])
    //Filter entries by the predicate
    .filter(([k, v]) => predicate(v, k))
    //Reduce the entries array back to an object
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Partial<O>);
}