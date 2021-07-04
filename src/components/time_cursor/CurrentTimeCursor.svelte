<script lang="ts">
  import TimeCursor from "$src/components/time_cursor/TimeCursor.svelte";
  import { dayFraction, nowMinute } from "$lib/timeStores";
</script>

<TimeCursor
  ratio={$dayFraction}
  time={$nowMinute}
  backgroundColor="#444"
  color="white"
/>
