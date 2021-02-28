import { Functor } from './Functor';
import { clamp } from './utils';

const numberFunctions = {
  clamp(this: Functor<number>, min: number, max: number) {
    return Functor.of(clamp(this.value, min, max));
  }
}

export default numberFunctions;