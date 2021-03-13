import { RhaxBase } from './RhaxBase';
import { ExtensibleFunction } from './ExtensibleFunction';
import { Rhax } from './Rhax';
import { NumberRhax } from './NumberRhax';
import { ObjectRhax } from './ObjectRhax';


export class RhaxCore<T> extends ExtensibleFunction<[], T> implements RhaxBase<T> {

  public readonly value: T;

  static of<T>(value: T) {
    return new RhaxCore(value) as unknown as Rhax<T>;
  }

  constructor(value: T) {
    //When called, we want to return the Functor's value.
    super(() => value);

    this.value = value;
    if (typeof value === 'number') {
      Object.assign(this, NumberRhax.prototype);
    }
    if (typeof value === 'object') {
      Object.assign(this, ObjectRhax.prototype);
    }
  }

  map<S>(fn: (value: T) => S): Rhax<S> {
    return RhaxCore.of(fn(this.value));
  }

  also(fn: (value: T) => void): Rhax<T> {
    fn(this.value);
    return RhaxCore.of(this.value);
  }

  default<S>(fallback: S): Rhax<NonNullable<T> | S> {
    return RhaxCore.of(this.value ?? fallback);
  }
}
// Typing for CoreFunctor as a callable variable. */
export interface RhaxCore<T> {
  (): T
}

export const rhax = RhaxCore.of.bind({});
export const take = RhaxCore.of.bind({});