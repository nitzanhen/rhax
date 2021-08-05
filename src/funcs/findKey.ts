import { RecordOrArray, ValueOf } from '../utils/types';

import { ArrayQuery, Query, RecordQuery } from './find';

export function findKey<E>(query: ArrayQuery<E>, array: E[]): number;
export function findKey<O extends Record<string, unknown>>(query: RecordQuery<O>, record: O): number;
export function findKey<C extends RecordOrArray>(query: Query<C>): (collection: C) => number;

export function findKey<C extends RecordOrArray>(query: Query<C>, collection?: C) {
  if (collection === undefined) {
    return (collection: C) => findKey(query as any, collection as any);
  }

  if (Array.isArray(collection)) {
    return collection.find((element, index) => (query as ArrayQuery<C>)(element, index));
  }

  return (Object.entries(collection) as [keyof C, ValueOf<C>][])
    .find(([k, v]) => (query as RecordQuery<C>)(v, k))?.[0];
}

export const findIndex = findKey;