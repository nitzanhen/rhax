import { ObjectKey } from '../utils/types';

export type ArrayTagger<E, T extends ObjectKey> = (element: E, index: number) => T;

export function groupBy<E, T extends ObjectKey>(arr: E[], tagger: ArrayTagger<E, T>, initialGroups?: Record<T, E[]>): Record<T, E[]>;
export function groupBy<E, T extends ObjectKey>(tagger: ArrayTagger<E, T>, initialGroups?: Record<T, E[]>): (arr: E[]) => Record<T, E[]>;
export function groupBy(...args: any[]) {
  if (args.length <= 2 && typeof args[0] === 'function') {
    const [tagger, initialGroups = {}] = args;
    return (arr: any[]) => groupBy(arr, tagger, initialGroups);
  }

  const [arr, tagger, initialGroups = {}] = args as [any[], ArrayTagger<any, any>, any];
  return arr.reduce(
    (groups, e, i) => {
      const tag = tagger(e, i);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag], e] : [e] };
    },
    initialGroups
  );
}

