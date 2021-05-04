import { methodsOf } from './utils/methodsOf';
import { EmptyObj } from './utils/types';

import { RhaxCommon } from './RhaxCommon';
import { RhaxNumber } from './RhaxNumber';
import { RhaxObject } from './RhaxObject';
import { RhaxArray } from './RhaxArray';

export type Rhax<T> =
  & RhaxCommon<T>
  & (T extends number ? RhaxNumber : EmptyObj)
  & (T extends (infer E)[]
    ? RhaxArray<E>
    : (T extends Record<string, unknown>
      ? RhaxObject<T>
      : EmptyObj
    )
  );

type RhaxConstructor = new <T>(value: T) => Rhax<T>;

const commonMethods = methodsOf(RhaxCommon);
const numberMethods = methodsOf(RhaxNumber);
const arrayMethods = methodsOf(RhaxArray);
const objectMethods = methodsOf(RhaxObject);

export const Rhax = function Rhax<T>(value: T) {
  const rhax = () => value;

  rhax.value = value;
  Object.assign(rhax, commonMethods);
  if (typeof value === 'number') {
    Object.assign(rhax, numberMethods);
  }
  if (Array.isArray(value)) {
    Object.assign(rhax, arrayMethods);
  }
  else if (typeof value === 'object') {
    Object.assign(rhax, objectMethods);
  }

  return rhax as Rhax<T>;
} as unknown as RhaxConstructor;

export const rhax = <T>(value: T) => new Rhax(value);
export const take = rhax;
