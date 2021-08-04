import { ElementOf, ItemOf, ObjectKey, RecordOrArray, ValueOf } from '../../utils/types';

import { reduce } from './reduce';

export type RecordTagger<O, T extends ObjectKey> = (value: ValueOf<O>, key: keyof O) => T;
export type ArrayTagger<E, T extends ObjectKey> = (element: E, index: number) => T;
export type Tagger<C, T extends ObjectKey> = C extends (infer E)[] ? ArrayTagger<E, T> : RecordTagger<C, T>;

export function groupBy<C extends RecordOrArray, T extends ObjectKey>(tagger: Tagger<C, T>, record: C): Record<T, ItemOf<C>[]>;
export function groupBy<C extends RecordOrArray, T extends ObjectKey>(tagger: Tagger<C, T>, record: C): Record<T, ItemOf<C>[]>;

export function groupBy<C extends RecordOrArray, T extends ObjectKey>(tagger: Tagger<C, T>): (collection: C) => Record<T, ItemOf<C>[]>;

export function groupBy<C extends RecordOrArray, T extends ObjectKey>(
  tagger: Tagger<C, T>,
  recordOrArray?: C
) {
  if (arguments.length < 2) {
    return (collection: C) => groupBy(tagger, collection);
  }

  if (Array.isArray(recordOrArray)) {
    return reduce(
      (groups, v, k) => {
        const tag = (tagger as ArrayTagger<ElementOf<C>, T>)(v, k);
        return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, v] : [v] };
      },
      {} as Record<T, ElementOf<C>[]>,
      recordOrArray
    );
  }

  return reduce(
    (groups, v, k) => {
      const tag = (tagger as RecordTagger<ElementOf<C>, T>)(v, k);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, v] : [v] };
    },
    {} as Record<T, ValueOf<C>[]>,
    recordOrArray!
  );
}