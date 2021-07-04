<script lang="ts" context="module">
  export interface ValueAndLabel<Value> {
    value: Value;
    label: string;
    optionProps?: svelte.JSX.SvelteOptionProps;
  }
</script>

<script lang="ts">
  import { isPlainObject, lowerCase } from "lodash";
  import { getConfigContext } from "./ConfigPanel.svelte";
  import { propertyStore } from "svelte-writable-derived";
  import type { Writable } from "svelte/store";

  export let labelProps: svelte.JSX.HTMLProps<HTMLLabelElement> | undefined = undefined;
  export let selectProps: svelte.JSX.SvelteSelectProps | undefined = undefined;

  type Value = $$Generic; // any
  
  export let id: string;
  export let label: string | undefined = undefined;
  export let options: (Value | ValueAndLabel<Value>)[] | undefined = undefined;

  const { config, defaults } = getConfigContext();
  const value: Writable<Value | undefined> = propertyStore(config, id);
  const placeholder = defaults[id];

  $: selectedValue = $value ?? placeholder;
  $: valueAndLabels = (options ?? []).map((v): ValueAndLabel<Value> => {
    if (isPlainObject(v) && v.hasOwnProperty("value") && v.hasOwnProperty("label")) {
      return v as ValueAndLabel<Value>;
    } else {
      return {
        value: v as Value,
        label: String(v),
      };
    }
  });
</script>

<label for={id} {...labelProps}>{label ?? lowerCase(id)}</label>
<select {id} bind:value={$value} {...selectProps} on:blur on:change on:focus on:click on:contextmenu>
  {#each valueAndLabels as { value, label, optionProps } (value)}
    <option {value} selected={value === selectedValue} {...optionProps}>{label}</option>
  {/each}
</select>

<style>
  select {
    width: min-content;
  }
</style>
