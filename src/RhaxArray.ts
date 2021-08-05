
import { groupBy, reduce, indexBy, ArrayReducer, ArrayTagger, ArrayIndexer } from './funcs';

import { rhax } from './Rhax';
import { RhaxBase } from './RhaxBase';
import { ObjectKey } from './utils/types';


export interface RhaxArray<E> extends RhaxBase<E[]> { }
export class RhaxArray<E> {
  reduce<A>(reducer: ArrayReducer<E, A>, initialValue: A) {
    return rhax(reduce(reducer, initialValue, this.value));
  }

  groupBy<T extends ObjectKey>(tagger: ArrayTagger<E, T>) {
    return rhax(groupBy(tagger, this.value));
  }

  indexBy<T extends ObjectKey>(indexer: ArrayIndexer<E, T>) {
    return rhax(indexBy(indexer, this.value));
  }
}