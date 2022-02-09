import { ObjectKey } from '../utils/types';
import { toObject } from '.';

export type ArrayIndexer<E, T> = (element: E, index: number) => T

export const indexArray = <E, T extends ObjectKey>(arr: E[], indexer: ArrayIndexer<E, T>): Record<T, E> =>
  toObject(arr.map((e, i) => [indexer(e, i), e]));