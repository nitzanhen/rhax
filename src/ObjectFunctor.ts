import BaseFunctor from './BaseFunctor';
import { CoreFunctor } from './CoreFunctor';
import { filter, mapFields, reduce } from './fp/object';
import { find } from './fp/object/find';
import { findKey } from './fp/object/findKey';

export interface ObjectFunctor<K extends string, V> extends BaseFunctor<Record<K, V>> { }
export class ObjectFunctor<K extends string, V> {

  mapFields<W>(fn: (value: V, key: K, record: Record<K, V>) => W) {
    return CoreFunctor.of(mapFields(fn, this.value));
  }

  filter(predicate: (value: V, key: K, record: Record<K, V>) => boolean) {
    return CoreFunctor.of(filter(predicate, this.value));
  }

  reduce<A = Record<K, V>>(reducer: (acc: A, value: V, key: K, record: Record<K, V>) => A, initialValue: A) {
    return CoreFunctor.of(
      reduce(reducer, initialValue, this.value)
    );
  }

  find(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    return CoreFunctor.of(
      find(query, this.value)
    );
  }

  findKey(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    return CoreFunctor.of(
      findKey(query, this.value)
    );
  }
}