import { RhaxCore } from './RhaxCore';
import { NumberRhax } from './NumberRhax';
import { ObjectRhax } from './ObjectRhax';

//
/* eslint @typescript-eslint/ban-types: off */

export type Rhax<T> =
  & RhaxCore<T>
  & T extends number ? NumberRhax : {}
  & T extends Record<string, unknown> ? ObjectRhax<T> : {};