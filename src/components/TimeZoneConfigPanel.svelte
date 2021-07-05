<script lang="ts">
  import ConfigPanel from "$components/ConfigPanel/ConfigPanel.svelte";
  import InputNumber from "$components/ConfigPanel/InputNumber.svelte";
  import InputSelect from "$components/ConfigPanel/InputSelect.svelte";
  import QueryStateButtons from "$components/ConfigPanel/QueryStateButtons.svelte";
  import type { Config } from "$lib/timeStores";
  import { barEndHour, barStartHour, defaultConfig, timeZoneConfig, zones } from "$lib/timeStores";
  import { timeZonesNames } from "@vvo/tzdb";
  import { fromPairs, isNil, keys } from "lodash";
  import { DateTime } from "luxon";
  import type { Writable } from "svelte/store";
  import InputCheck from "./ConfigPanel/InputCheck.svelte";
  import InputSvelteSelect from "./ConfigPanel/InputSvelteSelect.svelte";

  const config: Writable<Config> = timeZoneConfig;
  const defaults: Config = defaultConfig;
  const queryKeyMap = {
    ...fromPairs(keys(defaults).map((k) => [k, k])),
    localTimeZone: "tz",
    barStartHour: "start",
    barEndHour: "end",
  };
</script>

<ConfigPanel {config} {defaults} title="config">
  <InputSelect id="localTimeZone" options={$zones} />
  <InputNumber id="barStartHour" integer inputProps={{ max: $barEndHour - 1 }} />
  <InputNumber id="barEndHour" integer inputProps={{ min: $barStartHour + 1 }} />
  <InputCheck id="snapTo15Minutes" />
  <InputSvelteSelect
    id="zones"
    options={[...timeZonesNames, "UTC"]
      // only valid time zones
      .filter((tz) => !isNil(DateTime.now().setZone(tz).zoneName))}
  />
  <QueryStateButtons {queryKeyMap} autoload autosave />
</ConfigPanel>
