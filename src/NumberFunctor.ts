import BaseFunctor from './BaseFunctor';
import { CoreFunctor } from './CoreFunctor';
import { clamp } from './utils';

export interface NumberFunctor extends BaseFunctor<number> { }
export class NumberFunctor {

  public readonly value!: number;

  clamp(min: number, max: number) {
    return CoreFunctor.of(clamp(this.value, min, max));
  }
}