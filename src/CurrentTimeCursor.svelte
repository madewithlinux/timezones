<!-- GridTimeCursor.svelte -->
<script lang="ts">
  import { dayFraction } from "./timeStores";
  import ZonedTimeDisplay from "./ZonedTimeDisplay.svelte";
</script>

<div class="position" style="--dayFraction: {$dayFraction};">
  <div class="inner cursor" />
  <div class="inner">
    <div style="transform: translateY(-100%);">
      <ZonedTimeDisplay />
    </div>
  </div>
</div>

<style>
  .position {
    position: absolute;
    height: 100%;
    top: 0;
    width: 0;
    left: calc(var(--dayFraction) * 100%);
    grid-column-start: 2;
    grid-column-end: span 1;
    justify-self: stretch;
    align-self: stretch;
  }

  .inner {
    position: absolute;
    transform: translateX(calc(-100% * var(--dayFraction)));
    z-index: 100;
  }

  .cursor {
    width: 2px;
    height: 100%;
    background-color: #444;
    z-index: -100;
  }
</style>
