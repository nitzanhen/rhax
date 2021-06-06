import { groupBy } from './fp/array/groupBy';
import { indexBy } from './fp/array/indexBy';
import { reduce } from './fp/array/reduce';

import { rhax } from './Rhax';
import { RhaxBase } from './RhaxBase';


export interface RhaxArray<E> extends RhaxBase<E[]> { }
export class RhaxArray<E> {
  reduce<A>(reducer: (acc: A, element: E, index: number, array: E[]) => A, initialValue: A) {
    return rhax(reduce(reducer, initialValue, this.value));
  }

  groupBy<T extends string | number | symbol>(tagger: (element: E, index: number, array: E[]) => T) {
    return rhax(groupBy(tagger, this.value));
  }

  indexBy<T extends string | number | symbol>(indexer: (element: E, index: number, array: E[]) => T) {
    return rhax(indexBy(indexer, this.value));
  }
}