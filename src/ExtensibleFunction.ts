
/**
 * A class adapting Function for extension; this
 * allows creating callable object elegantly.
 * 
 * Borrowed from the excellent answer at {@link https://stackoverflow.com/a/36871498}
 */
export abstract class ExtensibleFunction<A extends any[], B> extends Function {
  constructor(fn: (...args: A) => B) {
    super();
    /* 
     * `setPrototypeOf` might slow down performence (there's a fair warning on this at the MDN docs).
     * If it does, we *could* convert this to a hardcoded code function (the the first suggestion in the answer above),
     * but that seems non-elegant.
     */
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}