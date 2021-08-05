import { IdentifierOf, RecordOrArray } from '../utils/types';

import { filter } from './filter';

export function pick<E>(indices: number[], array: E[]): E[];
export function pick<O, K extends keyof O>(keys: K[], record: O): Pick<O, K>;

export function pick<C extends RecordOrArray, I extends IdentifierOf<C>>(
  identifiers: I[]
): C extends (infer E)[] ? (array: E[]) => E[] : (record: C) => Pick<C, I & keyof C>


export function pick<C extends RecordOrArray, I extends IdentifierOf<C>>(identifiers: I[], collection?: C) {
  if(arguments.length < 2) {
    return (collection: C) => pick(identifiers as any, collection);
  }

  const idSet = new Set<IdentifierOf<C>>(identifiers);

  return filter((_, k) => !idSet.has(k as IdentifierOf<C>), collection);
}

