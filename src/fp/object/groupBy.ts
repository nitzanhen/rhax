import { ElementOf, ObjectKey, RecordOrArray, ValueOf } from '../../utils/types';

import { reduce } from './reduce';

export type RecordTagger<T extends ObjectKey, O> = (value: ValueOf<O>, key: keyof O) => T;
export type ArrayTagger<T extends ObjectKey, E> = (element: E, index: number) => T;
export type Tagger<T extends ObjectKey, C> = C extends (infer E)[] ? ArrayTagger<T, E> : RecordTagger<T, C>;

export function groupBy<T extends ObjectKey, C extends RecordOrArray>(
  tagger: Tagger<T, C>
): C extends (infer E)[] ? (array: E[]) => Record<T, E[]> : (record: C) => Record<T, ValueOf<C>[]>;

export function groupBy<T extends ObjectKey, O>(tagger: RecordTagger<T, O>, record: O): Record<T, ValueOf<O>[]>;

export function groupBy<T extends ObjectKey, E>(tagger: ArrayTagger<T, E>, array: E[]): Record<T, E[]>;

export function groupBy<C extends RecordOrArray, T extends ObjectKey>(
  tagger: Tagger<T, C>,
  recordOrArray?: C
) {
  if (arguments.length < 2) {
    return (collection: C) => groupBy(tagger as any, collection);
  }

  return reduce(
    (groups, v, k) => {
      const tag: T = (tagger as any)(v, k);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, v] : [v] };
    },
    {} as Record<T, (ElementOf<C> | ValueOf<C>)[]>
  )(recordOrArray!);
}