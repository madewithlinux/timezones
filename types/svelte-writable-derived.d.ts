declare module "svelte-writable-derived" {
  import { Writable } from "svelte/store";

  /**
   * @external Store
   * @see [Svelte stores]{@link https://svelte.dev/docs#Store_contract}
   */
  /**
   * Create a store similar to {@link https://svelte.dev/docs#derived Svelte's `derived`}, but which
   * has its own `set` and `update` methods and can send values back to the origin stores.
   * {@link https://github.com/PixievoltNo1/svelte-writable-derived#default-export-writablederived Read more...}
   *
   * @param {Store|Store[]} origins One or more stores to derive from. Same as
   * {@link https://svelte.dev/docs#derived `derived`}'s 1st parameter.
   * @param {!Function} derive The callback to determine the derived value. Same as
   * {@link https://svelte.dev/docs#derived `derived`}'s 2nd parameter.
   * @param {!Function|{withOld: !Function}} reflect Called when the
   * derived store gets a new value via its `set` or `update` methods, and determines new values for
   * the origin stores. {@link https://github.com/PixievoltNo1/svelte-writable-derived#new-parameter-reflect Read more...}
   * @param [initial] The new store's initial value. Same as
   * {@link https://svelte.dev/docs#derived `derived`}'s 3rd parameter.
   *
   * @returns {Store} A writable store.
   */
  export default function writableDerived(
    origins: any | any[],
    derive: Function,
    reflect:
      | Function
      | {
          withOld: Function;
        },
    initial?: any
  ): any;

  /**
   * Create a store for a property value in an object contained in another store.
   * {@link https://github.com/PixievoltNo1/svelte-writable-derived#named-export-propertystore Read more...}
   *
   * @param {Store} origin The store containing the object to get/set from.
   * @param {string|symbol|Array<string|symbol>} propName The property to get/set, or a path of
   * properties in nested objects.
   *
   * @returns {Store} A writable store.
   */
  export function propertyStore<T, K extends keyof T>(origin: Writable<T>, propName: K): Writable<T[K]>;
    export function propertyStore(
      origin: Writable<any>,
      propName: string | symbol | Array<string | symbol>
    ): Writable<any>;
}
