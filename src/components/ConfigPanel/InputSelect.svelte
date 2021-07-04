<script lang="ts" context="module">
  export interface ValueAndLabel<Value> {
    value: Value;
    label: string;
    optionProps?: svelte.JSX.SvelteOptionProps;
  }
</script>

<script lang="ts">
  import { isPlainObject, lowerCase } from "lodash";

  type Value = $$Generic; // any

  export let id: string;
  export let label: string | undefined = undefined;
  export let value: Value | undefined = undefined;
  export let selected: Value | undefined = undefined;
  export let options: Value[] | ValueAndLabel<Value>[] | undefined = undefined;
  export let labelProps: svelte.JSX.HTMLProps<HTMLLabelElement> | undefined = undefined;
  export let selectProps: svelte.JSX.SvelteSelectProps | undefined = undefined;

  // $: selectedValue = value;
  $: valueAndLabels = (options ?? []).map((v): ValueAndLabel<Value> => {
    if (isPlainObject(v) && v.hasOwnProperty("value") && v.hasOwnProperty("label")) {
      return v as ValueAndLabel<Value>;
    } else {
      return {
        value: v,
        label: String(v),
      };
    }
  });
</script>

<label for={id} {...labelProps}>{label ??  lowerCase(id)}</label>
<select {id} bind:value {...selectProps} on:blur on:change>
  {#each valueAndLabels as { value, label, optionProps } (value)}
    <option {value} selected={value === selected} {...optionProps}>{label}</option>
  {/each}
</select>


<style>
  select {
    width: min-content;
  }
</style>