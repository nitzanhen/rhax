import { clamp } from 'fp/number';

import { rhax } from './Rhax';
import { RhaxBase } from './RhaxBase';

export interface RhaxNumber extends RhaxBase<number> { }
export class RhaxNumber {

  clamp(min: number, max: number) {
    return rhax(clamp(this.value, min, max));
  }
}