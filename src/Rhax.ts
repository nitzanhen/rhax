import { RhaxCommon } from './RhaxCommon';
import { RhaxNumber } from './RhaxNumber';
import { RhaxObject } from './RhaxObject';
import { EmptyObj } from './types';

export type Rhax<T> =
  & RhaxCommon<T>
  & T extends number ? RhaxNumber : EmptyObj
  & T extends Record<string, unknown> ? RhaxObject<T> : EmptyObj;

type RhaxConstructor = new <T>(value: T) => Rhax<T>;

export const Rhax = function RhaxClass<T>(value: T) {
  const self = () => value;

  self.value = value;
  Object.assign(self, RhaxCommon.prototype);
  if (typeof value === 'number') {
    Object.assign(self, RhaxNumber.prototype);
  }
  if (typeof value === 'object') {
    Object.assign(self, RhaxObject.prototype);
  }

  return self as Rhax<T>;
} as unknown as RhaxConstructor;

export const rhax = <T>(value: T) => new Rhax(value);
export const take = rhax;
