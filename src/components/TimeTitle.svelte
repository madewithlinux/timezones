<script lang="ts">
  import { DateTime } from "luxon";
  import { nowSecond, localTimeZone } from "$lib/timeStores";

  $: timeStr = $nowSecond
    .setZone($localTimeZone)
    .toLocaleString(DateTime.TIME_WITH_SECONDS);
</script>

<h1>It is {timeStr} in {$localTimeZone}</h1>
