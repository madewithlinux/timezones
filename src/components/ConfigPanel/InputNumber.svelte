<script lang="ts">
  import { get, lowerCase, set } from "lodash";
  import { getConfigContext } from "./ConfigPanel.svelte";

  type Value = $$Generic<string | number>;

  export let id: string;
  export let label: string = lowerCase(id);
  // export let value: Value | undefined = undefined;
  export let integer: boolean = false;
  export let inputProps: Partial<svelte.JSX.SvelteInputProps> | undefined = undefined;
  export let labelProps: Partial<svelte.JSX.HTMLProps<HTMLLabelElement>> | undefined = undefined;

  const { config } = getConfigContext();
  $: value = get($config, id);
  $: setValue = (value: Value) => ($config = set($config, id, value));

  // $: value =

  const integerOnChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    if (integer) {
      value = Math.round(e.currentTarget.valueAsNumber) as Value;
    }
  };
</script>

<!-- {@debug label, value} -->
<!-- {@debug $$props} -->

<label for={id} {...labelProps}>{label ?? lowerCase(id)}</label>
<input
  {id}
  type="number"
  bind:value
  on:change|self={integerOnChange}
  {...inputProps}
  on:focus
  on:change
  on:click
  on:contextmenu
  on:blur
/>

<!-- {#if integer}
  <input
    {id}
    type="number"
    {value}
    on:change|self={integerOnChange}
    
    {...inputProps}
    on:focus
    on:change
    on:click
    on:contextmenu
    on:blur
  />
{:else}
  <input
    {id}
    type="number"
    bind:value
    {...inputProps}
    on:focus
    on:change
    on:click
    on:contextmenu
    on:blur
  />
{/if} -->
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
