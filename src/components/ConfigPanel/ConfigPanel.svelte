<script context="module" lang="ts">
  export const contextKey = Symbol("ConfigPanelContext");

  export interface ConfigContext {
    config: Writable<Record<string, any>>;
  }

  export const getConfigContext = (): ConfigContext => getContext(contextKey);
</script>

<script lang="ts">
  import { filter, keys, toPairs } from "lodash";
  import { getContext, setContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  // import { propertyStore } from "svelte-writable-derived/index.mjs";
  // import { propertyStore } from "svelte-writable-derived";

  export let title: string = "config";

  let config: Writable<Record<string, any>> = writable({});

  setContext(contextKey, { config });
</script>

<div class="config">
  <h1>{title}</h1>
  <div class="grid">
    <slot />
  </div>
</div>

<style>
  .config {
    box-sizing: border-box;
    width: max-content;
    max-width: 100%;
    font-size: 1.2rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
</style>
