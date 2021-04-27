import { Constructor } from './types';

/**
 * Extracts the methods of a class declaration into an object (with enumerable properties).
 * This is needed for the Rhax constructor, 
 * 
 * @param clazz the class to extract methods from.
 * @returns an object containing all methods of the class as enumerable properties.
 */
export const methodsOf = <C extends Constructor<any>>(clazz: C) => {
  const methodKeys =
    Object.getOwnPropertyNames(clazz.prototype)
      .filter(key => key !== 'constructor') as (keyof C)[];

  return methodKeys.reduce((acc, key) => ({ ...acc, [key]: clazz.prototype[key] }), {} as C[keyof C]);
};