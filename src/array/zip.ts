import { makeArray } from './makeArray';

export const zip = <T, S>(arr1: T[], arr2: S[]): [T, S][] => 
  makeArray(
    Math.min(arr1.length, arr2.length),
    i => [arr1[i], arr2[i]]
  );