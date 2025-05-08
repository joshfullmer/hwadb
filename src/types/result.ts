export type Failure<E extends Error = Error> = {
  ok: false;
  error: E;
};

export type Success<T> = {
  ok: true;
  data: T;
};

export type Result<T, E extends Error = Error> = Failure<E> | Success<T>;

export const err = <E extends Error>(error: E): Failure<E> => ({
  ok: false,
  error,
});

export const ok = <T>(data: T): Success<T> => ({
  ok: true,
  data,
});
