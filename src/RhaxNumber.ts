

import { clamp } from './funcs';
import { rhax } from './Rhax';
import { RhaxBase } from './RhaxBase';

export interface RhaxNumber extends RhaxBase<number> { }
export class RhaxNumber {

  clamp(min: number, max: number) {
    return rhax(clamp(min, max, this.value));
  }
}