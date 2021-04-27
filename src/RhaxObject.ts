import { filter, mapFields, reduce, find, findKey } from 'fp/object';
import { rhax } from 'Rhax';

import { RhaxBase } from './RhaxBase';
import { ValueOf } from './types';

export interface RhaxObject<O> extends RhaxBase<O> { }
export class RhaxObject<O> {

  mapFields<W>(fn: (value: ValueOf<O>, key: keyof O, record: O) => W) {
    return rhax(mapFields(fn, this.value));
  }

  filter(predicate: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return rhax(filter(predicate, this.value));
  }

  reduce<A = ValueOf<O>>(reducer: (acc: A, value: ValueOf<O>, key: keyof O, record: O) => A, initialValue: A) {
    return rhax(
      reduce(reducer, initialValue, this.value)
    );
  }

  find(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return rhax(
      find(query, this.value)
    );
  }

  findKey(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return rhax(
      findKey(query, this.value)
    );
  }
}