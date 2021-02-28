import numberFunctions from './numberFunctions';
import objectFunctions from './objectFunctions';

type ConditionalMixin<T, Class, Methods> = T extends Class ? Methods : {};

type FunctorType<T> =
  & Functor<T>
  & ConditionalMixin<T, number, typeof numberFunctions>
  & ConditionalMixin<T, Record<string, unknown>, typeof objectFunctions>;

export class Functor<T> {

  public readonly value: T;

  static of<T>(value: T) {
    return new Functor(value) as FunctorType<T>
  }

  private constructor(value: T) {
    this.value = value;
    if (typeof value === 'number') {
      Object.assign(this, numberFunctions)
    };
    if (typeof value === 'object') {
      Object.assign(this, objectFunctions);
    }
  }

  map<S>(fn: (value: T) => S): FunctorType<S> {
    return Functor.of(fn(this.value))
  }

  also(fn: (value: T) => void): this {
    fn(this.value);
    return this;
  }

  default<S>(fallback: S): FunctorType<NonNullable<T> | S> {
    return Functor.of(this.value ?? fallback);
  }
}

export const take = Functor.of
