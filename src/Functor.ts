import { CoreFunctor } from './CoreFunctor';
import { NumberFunctor } from './NumberFunctor';
import { ObjectFunctor } from './ObjectFunctor';

export type Functor<T> =
  & CoreFunctor<T>
  & T extends number ? NumberFunctor : {}
  & T extends Record<infer K, infer V> ? K extends string ? ObjectFunctor<K, V> : {} : {};

