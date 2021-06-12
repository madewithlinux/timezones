<script lang="ts">
  import { DateTime } from "luxon";
  import { nowMinute } from "./timeStores";

  export let ianaTimeZone: string;
  export let timeFormat = DateTime.TIME_SIMPLE;

  $: timeStr = $nowMinute.setZone(ianaTimeZone).toLocaleString(timeFormat);
</script>

<div>{timeStr}</div>

<style>
  div {
    text-align: right;
    width: max-content;
  }
</style>

