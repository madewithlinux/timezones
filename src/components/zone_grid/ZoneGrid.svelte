<script lang="ts">
  import CurrentTimeCursor from "$src/components/time_cursor/CurrentTimeCursor.svelte";
  import MouseListener from "$src/components/time_cursor/MouseListener.svelte";
  import MouseTimeCursor from "$src/components/time_cursor/MouseTimeCursor.svelte";
  import ZoneBars from "$src/components/zone_grid/ZoneBars.svelte";
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
