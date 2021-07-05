<script lang="ts" context="module">
  export interface ValueAndLabel<Value> {
    value: Value;
    label: string;
    optionProps?: svelte.JSX.SvelteOptionProps;
  }
</script>

<script lang="ts">
  import { isPlainObject,lowerCase } from "lodash";
  import Select from "svelte-select/src/Select.svelte";
  import { propertyStore } from "svelte-writable-derived";
  import type { Writable } from "svelte/store";
  import { getConfigContext } from "./ConfigPanel.svelte";

  export let labelProps: svelte.JSX.HTMLProps<HTMLLabelElement> | undefined = undefined;

  type Value = $$Generic; // any

  export let id: string;
  export let label: string | undefined = undefined;
  export let options: (Value | ValueAndLabel<Value>)[] | undefined = undefined;
  export let transformValues = (values: ValueAndLabel<Value>[]): Value[] =>
    values.map(({ value }) => value);

  const { config, defaults } = getConfigContext();
  const value: Writable<Value[] | undefined> = propertyStore(config, id);
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
<div class="wide">
  <Select
    containerStyles="
  flex-direction: column;
  --multiLabelMargin: 0 auto 0 0;
  --multiSelectPadding: 0 10px;
  "
    value={selectedValue}
    items={valueAndLabels}
    isMulti={true}
    listAutoWidth={false}
    isClearable={false}
    on:clear={(e) => {
      if (transformValues) {
        $value = transformValues([]);
      }
    }}
    on:select={(e) => {
      const zones = e.detail;
      if (transformValues) {
        $value = transformValues(zones);
      }
    }}
  />
</div>

<style>
  .wide {
    grid-column-start: 1;
    grid-column-end: span 2;
    width: 100%;
  }
</style>
