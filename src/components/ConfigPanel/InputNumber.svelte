<script lang="ts">
  import { get, isNil, lowerCase, set } from "lodash";
  import { getConfigContext } from "./ConfigPanel.svelte";
  import { propertyStore } from "svelte-writable-derived";
  import type { Writable } from "svelte/store";

  type Value = $$Generic<string | number>;

  export let id: string;
  export let label: string = lowerCase(id);
  export let integer: boolean = false;
  export let fillDefaultOnFocus: boolean = true;

  export let inputProps: Partial<svelte.JSX.SvelteInputProps> | undefined = undefined;
  export let labelProps: Partial<svelte.JSX.HTMLProps<HTMLLabelElement>> | undefined = undefined;

  const { config, defaults } = getConfigContext();
  const value: Writable<number> = propertyStore(config, id);
  const placeholder = defaults[id];

  const onChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    if (integer) {
      $value = Math.round(e.currentTarget.valueAsNumber);
    }
  };
</script>

<label for={id} {...labelProps}>{label ?? lowerCase(id)}</label>
<input
  {id}
  type="number"
  bind:value={$value}
  on:change|self={onChange}
  {placeholder}
  on:focus={(e) => {
    if (fillDefaultOnFocus && isNaN(e.currentTarget.valueAsNumber)) {
      e.currentTarget.value = placeholder;
    }
  }}
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

  input[type="number"] {
    justify-self: end;
    width: 80px;
    text-align: end;
  }
</style>
