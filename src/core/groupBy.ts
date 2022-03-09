import { ObjectKey } from '../utils/types';

export type ArrayTagger<E, T extends ObjectKey> = (element: E, index: number) => T;

/**
 * Groups the elements of an array.
 * 
 * `groupBy` aggregates a given array `arr` by assigning each of its elements a "tag", evaluated by a given `tagger`,
 * and grouping all elements by their tags. The result is a record whose keys are the tags produced by `tagger`, and for each tag,
 * the corresponding value is an array containing all elements that were assigned this tag.
 * 
 * @param arr the array to aggregate.
 * @param tagger a function that evaluates, for each element, the group it belongs to.
 * @param initialGroups an optional initial record of groups to start from.
 * 
 * @example
 * const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
 * const modulo3 = groupBy(nums, n => n % 3);
 * console.log(modulo3); // { 0: [0, 3, 6], 1: [1, 4, 7], 2: [2, 5, 8] }
 */
export function groupBy<E, T extends ObjectKey>(arr: E[], tagger: ArrayTagger<E, T>, initialGroups?: Record<T, E[]>): Record<T, E[]>;

/**
 * Curried variant of `groupBy`.
 * 
 * @example
 * const groupModulo3 = groupBy((n: number) => n % 3);
 * console.log(typeof groupModulo3); // 'function'
 * 
 * const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
 * const modulo3 = groupModulo3(nums);
 * console.log(modulo3); // { 0: [0, 3, 6], 1: [1, 4, 7], 2: [2, 5, 8] }
 */
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

