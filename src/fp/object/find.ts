import { ItemOf, RecordOrArray, ValueOf } from '../../utils/types';

export type RecordQuery<O> = (value: ValueOf<O>, key: keyof O) => boolean;
export type ArrayQuery<E> = (element: E, index: number) => boolean;
export type Query<C extends RecordOrArray> = C extends (infer E)[] ? ArrayQuery<E> : RecordQuery<C>;

export function find<C extends RecordOrArray>(query: Query<C>, collection: C): ItemOf<C>
export function find<C extends RecordOrArray>(query: Query<C>): (collection: C) => ItemOf<C>;

export function find<C extends RecordOrArray>(query: Query<C>, collection?: C) {
  if (collection === undefined) {
    return (collection: C) => find(query, collection);
  }

  if (Array.isArray(collection)) {
    return collection.find((element, index) => (query as ArrayQuery<C>)(element, index));
  }

  return (Object.entries(collection) as [keyof C, ValueOf<C>][])
    .find(([k, v]) => (query as RecordQuery<C>)(v, k))?.[1];
}
