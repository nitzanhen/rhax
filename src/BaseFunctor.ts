import { Functor } from './Functor';

interface BaseFunctor<T> {
  readonly value: T;
  map<S>(fn: (value: T) => S): Functor<S>;
  also(fn: (value: T) => void): Functor<T>;
  default<S>(fallback: S): Functor<NonNullable<T> | S>;
  (): T
}

export default BaseFunctor;