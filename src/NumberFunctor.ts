import { CoreFunctor } from './CoreFunctor';
import { clamp } from './utils';

export class NumberFunctor extends CoreFunctor<number> {
  clamp(min: number, max: number) {
    return CoreFunctor.of(clamp(this.value, min, max));
  }
}