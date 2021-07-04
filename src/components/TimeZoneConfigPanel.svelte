<script lang="ts">
  import { DateTime } from "luxon";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  import ConfigPanel from "$components/ConfigPanel/ConfigPanel.svelte";
  import InputNumber from "$components/ConfigPanel/InputNumber.svelte";
  import InputSelect from "$components/ConfigPanel/InputSelect.svelte";
  import QueryStateButtons from "$components/ConfigPanel/QueryStateButtons.svelte";
  import { barEndHour,barStartHour,zones } from "$lib/timeStores";

  interface Config {
    localTimeZone?: string;
    barStartHour?: number;
    barEndHour?: number;
  }
  let config: Writable<Config> = writable({});

  const defaults = {
    localTimeZone: DateTime.now().toLocal().zoneName,
    barStartHour: 7,
    barEndHour: 19,
  };

  const queryKeyMap = {
    localTimeZone: "tz",
    barStartHour: "start",
    barEndHour: "end",
  };
</script>

<ConfigPanel {config} {defaults} title="config">
  <InputSelect id="localTimeZone" options={$zones} />
  <InputNumber id="barStartHour" integer inputProps={{ max: $barEndHour - 1 }} />
  <InputNumber id="barEndHour" integer inputProps={{ min: $barStartHour + 1 }} />
  <QueryStateButtons {queryKeyMap} autoload autosave />
</ConfigPanel>
