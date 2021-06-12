<!-- ZoneBars.svelte -->
<script lang="ts">
  import { DateTime } from "luxon";

  import { now, zones } from "./timeStores";
  import { toCanonicalTimeZoneName } from "./timeZoneUtils";
  import ZonedTimeDisplay from "./ZonedTimeDisplay.svelte";

  import colors from "./colors";
  import ZoneHours from "./ZoneHours.svelte";

  export let timeFormat = DateTime.TIME_SIMPLE;

  export let current_zones = $zones.map((tz) => [
    tz,
    toCanonicalTimeZoneName(tz),
  ]);

  const bgColor = (i) => `background-color: ${colors[i % colors.length]};`;
</script>

{#each current_zones as [label, ianaTimeZone], i (label)}
  <div class="label" style={bgColor(i)}>{label}</div>
  <div class="time" style={bgColor(i)}>
    <ZonedTimeDisplay {ianaTimeZone} {timeFormat} />
  </div>
  <div class="hour-container">
    <ZoneHours zone={ianaTimeZone} backgroundColor={colors[i % colors.length]} />
  </div>
{/each}

<style>

  .label, .time {
    padding: 20px;
  }

  .label {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .hour-container {
    position: relative;
    z-index: 0;
  }

  .hour {
    position: absolute;
    top: 0;
    left: calc(var(--index) * (100% / 23));
    width: 1px;
    height: 100%;
    background-color: black;
  }
</style>
