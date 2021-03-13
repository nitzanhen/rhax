import { clamp } from './fp/number';

import { RhaxBase } from './RhaxBase';
import { RhaxCore } from './RhaxCore';

export interface NumberRhax extends RhaxBase<number> { }
export class NumberRhax {

  public readonly value!: number;

  clamp(min: number, max: number) {
    return RhaxCore.of(clamp(this.value, min, max));
  }
}