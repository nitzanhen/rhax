import { err, ok, Result } from './Result';

export const safeTry = <T, E = unknown>(op: () => T): Result<T, E> => {
  try {
    return ok(op());
  }
  catch (e) {
    return err(e as E);
  }
};