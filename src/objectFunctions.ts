import { Functor } from './Functor';

const objectFunctions = {
  mapFields<K extends string, V, W>(this: Functor<Record<K, V>>, fn: (value: V, key: K, record: Record<K, V>) => W) {
    const entries = Object.entries(this.value) as [K, V][];

    return Functor.of(
      entries
        //Map each value of the current value to the value returned from `fn`; V -> W
        .map(([k, v]) => [k, fn(v, k, this.value)] as [K, W])
        //Reduce the entries array back to an object
        .reduce((acc, [k, w]) => ({ ...acc, [k]: w }), {} as Record<K, W>)
    );
  },

  filter<K extends string, V>(this: Functor<Record<K, V>>, predicate: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return Functor.of(
      entries
        //Filter entries by the predicate
        .filter(([k, v]) => predicate(v, k, this.value))
        //Reduce the entries array back to an object
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<K, V>)
    );
  },

  reduce<K extends string, V, A = Record<K, V>>(this: Functor<Record<K, V>>, reducer: (acc: A, value: V, key: K, record: Record<K, V>) => A, initialValue: A) {
    const entries = Object.entries(this.value) as [K, V][];

    return Functor.of(
      //Reduce using the reducer argument
      entries.reduce((acc, [k, v]) => reducer(acc, v, k, this.value), initialValue)
    )
  },

  find<K extends string, V>(this: Functor<Record<K, V>>, query: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return Functor.of(
      entries.find(([k, v]) => query(v, k, this.value))?.[1]
    )
  },

  findKey<K extends string, V>(this: Functor<Record<K, V>>, query: (value: V, key: K, record: Record<K, V>) => boolean) {
    const entries = Object.entries(this.value) as [K, V][];

    return Functor.of(
      entries.find(([k, v]) => query(v, k, this.value))?.[0]
    )
  }
};

export default objectFunctions;