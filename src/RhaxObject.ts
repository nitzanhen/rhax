

import { filter, map, reduce, find, findKey, groupBy, pick, omit, RecordMapper, RecordPredicate, RecordReducer, RecordQuery, RecordTagger } from './funcs';
import { rhax } from './Rhax';
import { RhaxBase } from './RhaxBase';
import { ObjectKey, ValueOf } from './utils/types';

export interface RhaxObject<O extends Record<string, unknown>> extends RhaxBase<O> { }
export class RhaxObject<O extends Record<string, unknown>> {

  map<W>(mapper: RecordMapper<O, W>) {
    return rhax(map(mapper, this.value));
  }

  filter(predicate: RecordPredicate<O>) {
    return rhax(filter(predicate, this.value));
  }

  reduce<A = ValueOf<O>>(reducer: RecordReducer<O, A>, initialValue: A) {
    return rhax(
      reduce(reducer, initialValue, this.value)
    );
  }

  find(query: RecordQuery<O>) {
    return rhax(
      find(query, this.value)
    );
  }

  findKey(query: RecordQuery<O>) {
    return rhax(
      findKey(query, this.value)
    );
  }

  groupBy<T extends ObjectKey>(tagger: RecordTagger<O, T>) {
    return rhax(
      groupBy(tagger, this.value)
    );
  }

  pick<K extends keyof O>(keys: K[]) {
    return rhax(
      pick(keys, this.value)
    );
  }

  omit<K extends keyof O>(keys: K[]) {
    return rhax(
      omit(keys, this.value)
    );
  }
}