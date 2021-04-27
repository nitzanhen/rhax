import { RhaxCommon } from './RhaxCommon';
import { RhaxNumber } from './RhaxNumber';
import { RhaxObject } from './RhaxObject';
import { EmptyObj } from './utils/types';

export type Rhax<T> =
  & RhaxCommon<T>
  & T extends number ? RhaxNumber : EmptyObj
  & T extends Record<string, unknown> ? RhaxObject<T> : EmptyObj;

type RhaxConstructor = new <T>(value: T) => Rhax<T>;

export const Rhax = function Rhax<T>(value: T) {
  const rhax = () => value;

  rhax.value = value;
  Object.assign(rhax, RhaxCommon);
  console.log(Object.getOwnPropertyNames(RhaxCommon.prototype), Object.getOwnPropertyNames(RhaxNumber.prototype));
  if (typeof value === 'number') {
    Object.assign(rhax, RhaxNumber.prototype);
  }
  if (typeof value === 'object') {
    Object.assign(rhax, RhaxObject.prototype);
  }

  return rhax as Rhax<T>;
} as unknown as RhaxConstructor;

export const rhax = <T>(value: T) => new Rhax(value);
export const take = rhax;
