import { IdentifierOf, RecordOrArray } from '../utils/types';

import { filter } from './filter';

export function omit<E>(indices: number[], array: E[]): E[];
export function omit<O, K extends keyof O>(keys: K[], record: O): Omit<O, K>;

export function omit<C extends RecordOrArray, I extends IdentifierOf<C>>(
  identifiers: I[]
): C extends (infer E)[] ? (array: E[]) => E[] : (record: C) => Omit<C, I>


export function omit<C extends RecordOrArray, I extends IdentifierOf<C>>(identifiers: I[], collection?: C) {
  if (arguments.length < 2) {
    return (collection: C) => omit(identifiers as any, collection);
  }

  const idSet = new Set<IdentifierOf<C>>(identifiers);

  return filter((_, k) => !idSet.has(k as IdentifierOf<C>), collection);
}
