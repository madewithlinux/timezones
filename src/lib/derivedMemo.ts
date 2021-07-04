import { derived, get } from 'svelte/store';
import type { Readable, Unsubscriber } from 'svelte/store';

/** One or more `Readable`s. */
type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>];
/** One or more values from `Readable` stores. */
type StoresValues<T> = T extends Readable<infer U> ? U : {
  [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
};


export function derivedMemo<S extends Stores, T>(
  stores: S,
  fn: (prev: T | undefined, values: StoresValues<S>, set: (value: T) => void) => Unsubscriber | void,
  initial_value?: T,
): Readable<T> {
  let prev = initial_value

  return derived(
    stores,
    (values, set) => fn(prev, values, (v) => { prev = v; set(v) }),
    initial_value,
  )
}

export function derivedWithKey<S extends Stores, T>(
  stores: S,
  fn: (values: StoresValues<S>) => T,
  keyFn: (value: T) => string | number,
): Readable<T> {
  const single = !Array.isArray(stores);
  const stores_array: Array<Readable<any>> = single
    ? [stores as Readable<any>]
    : stores as Array<Readable<any>>;
  const initial_value = fn(single ? get(stores_array[0]) : stores_array.map(get))

  let key: string | number | undefined = keyFn(initial_value)
  return derived(
    stores,
    (values, set) => {
      const v = fn(values)
      const k = keyFn(v)
      if (key !== k) {
        key = k
        set(v)
      }
    },
    initial_value,
  )
}

