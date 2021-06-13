<script lang="ts">
  import CurrentTimeCursor from "./CurrentTimeCursor.svelte";
  import MouseListener from "./MouseListener.svelte";
  import MouseTimeCursor from "./MouseTimeCursor.svelte";
  import ZoneBars from "./ZoneBars.svelte";
</script>

<div class="grid">
  <ZoneBars />
  <CurrentTimeCursor />
  <MouseTimeCursor />
  <MouseListener />
</div>

<style>
  .grid {
    position: relative;
    z-index: 0;
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-areas: label time bar;
    column-gap: 2px;
    row-gap: 10px;
  }
</style>
