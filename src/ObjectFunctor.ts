import { CoreFunctor } from './CoreFunctor';

export class ObjectFunctor<K extends string, V> extends CoreFunctor<Record<K, V>> {
  mapFields<W>(fn: (value: V, key: K, record: Record<K, V>) => W) {
    const entries = Object.entries(this.value) as [K, V][];

    return CoreFunctor.of(
      entries
        //Map each value of the current value to the value returned from `fn`; V -> W
        .map(([k, v]) => [k, fn(v, k, this.value)] as [K, W])
        //Reduce the entries array back to an object
        .reduce((acc, [k, w]) => ({ ...acc, [k]: w }), {} as Record<K, W>)
    );
  }

  filter(predicate: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return CoreFunctor.of(
      entries
        //Filter entries by the predicate
        .filter(([k, v]) => predicate(v, k, this.value))
        //Reduce the entries array back to an object
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<K, V>)
    );
  }

  reduce<A = Record<K, V>>(reducer: (acc: A, value: V, key: K, record: Record<K, V>) => A, initialValue: A) {
    const entries = Object.entries(this.value) as [K, V][];

    return CoreFunctor.of(
      //Reduce using the reducer argument
      entries.reduce((acc, [k, v]) => reducer(acc, v, k, this.value), initialValue)
    );
  }

  find(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return CoreFunctor.of(
      entries.find(([k, v]) => query(v, k, this.value))?.[1]
    );
  }

  findKey(query: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return CoreFunctor.of(
      entries.find(([k, v]) => query(v, k, this.value))?.[0]
    );
  }
}