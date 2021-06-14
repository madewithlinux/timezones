declare module "query-store" {
  import { Writable } from 'svelte/store';

  declare const query: Writable<{ [param: string]: string }> & {
    keepHistory(param: string),
    setWithoutHistory(params: string),
  };
  declare namespace query {
    declare function keepHistory(param: string);
    declare function setWithoutHistory(params: string);
  }

  export = query;
}
