import { makeArray } from '../core/makeArray';
import { tuple } from './helpers';

export const zip = <T, S>(arr1: T[], arr2: S[]): [T, S][] => 
  makeArray(
    Math.min(arr1.length, arr2.length),
    i => tuple(arr1[i], arr2[i])
  );