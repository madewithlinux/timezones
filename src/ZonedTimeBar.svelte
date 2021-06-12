<script lang="ts">
  import { DateTime } from "luxon";
  import { now } from "./timeStores";
  import ZonedTimeDisplay from "./ZonedTimeDisplay.svelte";

  export let bgColor: string;
  export let label: string;
  export let labelWidth: number;
  export let ianaTimeZone: string;
  // export let timeFormat = DateTime.TIME_WITH_SECONDS;
  export let timeFormat = DateTime.TIME_SIMPLE;

  $: timeStr = $now.setZone(ianaTimeZone).toLocaleString(timeFormat);

  $: localNow = $now.toLocal();

  $: dayStart = $now.toLocal().startOf("day").toUTC();
  $: hours = Array(23)
    .fill(0)
    .map((v, i) => dayStart.plus({ hours: i }).toLocaleString(timeFormat));
</script>

{@debug label, ianaTimeZone}

<div class="line" style="background-color: {bgColor};">
  <div class="label" style="width: {labelWidth}px;">{label}</div>
  <ZonedTimeDisplay {ianaTimeZone} {timeFormat} />
  <div class="hour-container">
    {#each hours as hour_text, i (hour_text)}
      <div class="hour" style="--index: {i};" />
    {/each}
  </div>
</div>

<style>
  .line {
    display: flex;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .hour-container {
    margin-left: 10px;
    flex-grow: 1;
    position: relative;
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
