<script lang="ts">
  import TimeCursor from "./TimeCursor.svelte";
  import { dayFraction, nowMinute } from "./timeStores";
</script>

<TimeCursor
  ratio={$dayFraction}
  time={$nowMinute}
  backgroundColor="#444"
  color="white"
/>
