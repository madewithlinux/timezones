<script lang="ts">
  import { get, isNil, lowerCase, set } from "lodash";
  import { getConfigContext } from "./ConfigPanel.svelte";
  import { propertyStore } from "svelte-writable-derived";
  import type { Writable } from "svelte/store";

  export let id: string;
  export let label: string = lowerCase(id);

  export let inputProps: Partial<svelte.JSX.SvelteInputProps> | undefined = undefined;
  export let labelProps: Partial<svelte.JSX.HTMLProps<HTMLLabelElement>> | undefined = undefined;

  const { config, defaults } = getConfigContext();
  const value: Writable<boolean> = propertyStore(config, id);
  const placeholder = defaults[id];
</script>

<label for={id} {...labelProps}>{label ?? lowerCase(id)}</label>
<input
  {id}
  type="checkbox"
  checked={$value ?? placeholder}
  on:change={(e) => ($value = e.currentTarget.checked)}
  {...inputProps}
  on:focus
  on:change
  on:click
  on:contextmenu
  on:blur
/>

<style>
  label,
  input {
    font-size: 1.2rem;
  }

  label {
    justify-self: stretch;
    align-self: stretch;
  }

  input[type="checkbox"] {
    justify-self: end;
    text-align: end;
    margin: 0;
    width: 2rem;
  }
</style>
