import { Rhax } from './Rhax';

export interface RhaxBase<T> {
  readonly value: T;
  also(fn: (value: T) => void): Rhax<T>;
  default<S>(fallback: S): Rhax<NonNullable<T> | S>;
  (): T
}