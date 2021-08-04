import { ItemOf, RecordOrArray, ValueOf } from '../../utils/types';

export type RecordQuery<O> = (value: ValueOf<O>, key: keyof O) => boolean;
export type ArrayQuery<E> = (element: E, index: number) => boolean;
export type Query<C extends RecordOrArray> = C extends (infer E)[] ? ArrayQuery<E> : RecordQuery<C>;

export function find<C extends RecordOrArray>(query: Query<C>, collection: C): ItemOf<C>
export function find<C extends RecordOrArray>(query: Query<C>): (collection: C) => ItemOf<C>;

export function find<O>(query: , record: O) {
  return (Object.entries(record) as [keyof O, ValueOf<O>][])
    .find(([k, v]) => query(v, k, record))?.[1];
}
