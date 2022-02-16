import { ObjectKey } from '../utils/types';
import { tuple } from './helpers';
import { toObject } from './toObject';

export type ArrayIndexer<E, T> = (element: E, index: number) => T

export function indexArray<E, T extends ObjectKey>(arr: E[], indexer: ArrayIndexer<E, T>): Record<T, E>;
export function indexArray<E, T extends ObjectKey>(indexer: ArrayIndexer<E, T>): (arr: E[]) => Record<T, E>;
export function indexArray(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const [indexer] = args;
    return (arr: any[]) => indexArray(arr, indexer);
  }

  const [arr, indexer] = args as [any[], ArrayIndexer<any, any>];
  return toObject(arr.map((e, i) => tuple(indexer(e, i), e)));
}
