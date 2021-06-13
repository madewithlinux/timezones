<script lang="ts">
  import TimeCursor from "./TimeCursor.svelte";
  import { cursorPosition } from "./timeStores";
</script>

{#if $cursorPosition.active}
  <TimeCursor
    ratio={$cursorPosition.ratio}
    time={$cursorPosition.time}
    backgroundColor="white"
    color="#444"
  />
{/if}
