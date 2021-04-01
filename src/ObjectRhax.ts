import { RhaxBase } from './RhaxBase';
import { RhaxCore } from './RhaxCore';
import { filter, mapFields, reduce, find, findKey } from './fp/object';
import { ValueOf } from './types';

export interface ObjectRhax<O extends Record<string, unknown>> extends RhaxBase<O> { }
export class ObjectRhax<O extends Record<string, unknown>> {

  mapFields<W>(fn: (value: ValueOf<O>, key: keyof O, record: O) => W) {
    return RhaxCore.of(mapFields(fn, this.value));
  }

  filter(predicate: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return RhaxCore.of(filter(predicate, this.value));
  }

  reduce<A = O>(reducer: (acc: A, value: ValueOf<O>, key: keyof O, record: O) => A, initialValue: A) {
    return RhaxCore.of(
      reduce(reducer, initialValue, this.value)
    );
  }

  find(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return RhaxCore.of(
      find(query, this.value)
    );
  }

  findKey(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean) {
    return RhaxCore.of(
      findKey(query, this.value)
    );
  }
}