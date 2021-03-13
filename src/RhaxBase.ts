import { Rhax } from './Rhax';

export interface RhaxBase<T> {
  readonly value: T;
  map<S>(fn: (value: T) => S): Rhax<S>;
  also(fn: (value: T) => void): Rhax<T>;
  default<S>(fallback: S): Rhax<NonNullable<T> | S>;
  (): T
}