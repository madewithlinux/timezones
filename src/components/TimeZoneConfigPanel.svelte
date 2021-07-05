<script lang="ts">
  import ConfigPanel from "$components/ConfigPanel/ConfigPanel.svelte";
  import InputNumber from "$components/ConfigPanel/InputNumber.svelte";
  import InputSelect from "$components/ConfigPanel/InputSelect.svelte";
  import QueryStateButtons from "$components/ConfigPanel/QueryStateButtons.svelte";
  import type { Config } from "$lib/timeStores";
  import { barEndHour, barStartHour, defaultZones, timeZoneConfig, zones } from "$lib/timeStores";
  import { timeZonesNames } from "@vvo/tzdb";
  import { fromPairs, isNil, keys } from "lodash";
  import { DateTime } from "luxon";
  import type { Writable } from "svelte/store";
  import InputCheck from "./ConfigPanel/InputCheck.svelte";
  import InputSvelteSelect from "./ConfigPanel/InputSvelteSelect.svelte";

  let config: Writable<Config> = timeZoneConfig;

  const defaults: Config = {
    localTimeZone: DateTime.now().toLocal().zoneName,
    barStartHour: 7,
    barEndHour: 19,
    snapTo15Minutes: false,
    zones: defaultZones,
  };

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
