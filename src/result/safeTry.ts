import { err, ok } from './Result';

export const safeTry = <T, E = unknown>(op: () => T) => {
  try {
    return ok(op());
  }
  catch (e) {
    return err(e as E);
  }
};