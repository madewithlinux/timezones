<script lang="ts">
  import { DateTime } from "luxon";
  import { nowMinute, localTimeZone } from "./timeStores";

  export let zone: string = $localTimeZone
  export let timeFormat = DateTime.TIME_SIMPLE

  $: timeStr = ($$props.time ?? $nowMinute).setZone(zone).toLocaleString(timeFormat);
</script>

<div>{timeStr}</div>

<style>
  div {
    text-align: right;
    min-width: max-content;
    justify-self: end;
  }
</style>
