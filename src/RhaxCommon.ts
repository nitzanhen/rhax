import { RhaxBase } from './RhaxBase';
import { Rhax, rhax } from './Rhax';

// Typing for CoreFunctor as a callable variable. */
export interface RhaxCommon<T> extends RhaxBase<T> {}
export class RhaxCommon<T> {
  map<S>(fn: (value: T) => S): Rhax<S> {
    return rhax(fn(this.value));
  }

  also(fn: (value: T) => void): Rhax<T> {
    fn(this.value);
    return rhax(this.value);
  }

  default<S>(fallback: S): Rhax<NonNullable<T> | S> {
    return rhax(this.value ?? fallback);
  }
}