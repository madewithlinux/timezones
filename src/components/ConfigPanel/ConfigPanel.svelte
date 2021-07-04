<script context="module" lang="ts">
  export const contextKey = Symbol("ConfigPanelContext");

  export interface ConfigContext {
    config: Writable<Record<string, any>>;
    defaults: Record<string, any>;
  }

  export const getConfigContext = (): ConfigContext => getContext(contextKey);
</script>

<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let title: string = "config";

  type Config = $$Generic<{}>;
  export let config: Writable<Config>;
  export let defaults: Config;

  setContext(contextKey, { config, defaults });
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
