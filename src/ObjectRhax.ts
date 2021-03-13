import { RhaxBase } from './RhaxBase';
import { RhaxCore } from './RhaxCore';
import { filter, mapFields, reduce, find, findKey } from './fp/object';

export interface ObjectRhax<K extends string, V> extends RhaxBase<Record<K, V>> { }
export class ObjectRhax<K extends string, V> {

  mapFields<W>(fn: (value: V, key: K, record: Record<K, V>) => W) {
    return RhaxCore.of(mapFields(fn, this.value));
  }

  filter(predicate: (value: V, key: K, record: Record<K, V>) => boolean) {
    return RhaxCore.of(filter(predicate, this.value));
  }

  reduce<A = Record<K, V>>(reducer: (acc: A, value: V, key: K, record: Record<K, V>) => A, initialValue: A) {
    return RhaxCore.of(
      reduce(reducer, initialValue, this.value)
    );
  }

  find(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    return RhaxCore.of(
      find(query, this.value)
    );
  }

  findKey(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    return RhaxCore.of(
      findKey(query, this.value)
    );
  }
}