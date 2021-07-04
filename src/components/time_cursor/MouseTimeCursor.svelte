<script lang="ts">
  import TimeCursor from "$src/components/time_cursor/TimeCursor.svelte";
  import { cursorPosition } from "$lib/timeStores";
</script>

{#if $cursorPosition.active}
  <TimeCursor
    ratio={$cursorPosition.ratio}
    time={$cursorPosition.time}
    backgroundColor="white"
    color="#444"
  />
{/if}
