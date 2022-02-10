
/**
 * Creates a tuple containing the given args.
 * At runtime a tuple is simply an array; `tuple`'s purpose is 
 * to have Typescript treat the data as a tuple type, not an array type.
 * 
 * In some cases, it could be used to make the programmer's intent clearer.
 * 
 * @example 
 * // type: [number, string, boolean, number], *not* (number | string | boolean)[]
 * tuple(1, 'a', true, 3) => [1, 'a', true, 3]
 */
export const tuple = <A extends any[]>(...args: A): A => args;