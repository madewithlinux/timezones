<!-- ZoneHours.svelte -->
<script lang="ts">
  import {
    hourGradient,
    hours,
    localDayStart,
    cursorPosition,
  } from "./timeStores";
  import ZonedTimeDisplay from "./ZonedTimeDisplay.svelte";
  import { fade } from "svelte/transition";
  import { dayFraction } from "./timeStores";

  export let zone: string;
  export let backgroundColor: string;

  $: background = `background: ${hourGradient(
    $localDayStart,
    zone,
    backgroundColor,
    $hours
  )};`;
</script>

<div class="gradient" style={background}>
  <div class="position current time" style="--dayFraction: {$dayFraction};">
    <ZonedTimeDisplay {zone} />
  </div>
  <div class="position cursor current" style="--dayFraction: {$dayFraction};" />
  {#if $cursorPosition.active}
    <div
      transition:fade
      class="position cursor mouse"
      style="--dayFraction: {$cursorPosition.ratio};"
    />
    <div
      transition:fade
      class="position mouse time"
      style="--dayFraction: {$cursorPosition.ratio};"
    >
      <ZonedTimeDisplay {zone} time={$cursorPosition.time} />
    </div>
  {/if}
</div>

<style>
  .gradient {
    height: 100%;
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
  }

  .cursor {
    width: 2px;
    height: 100%;
    z-index: 100;
  }

  .position {
    position: absolute;
    top: 50%;
    left: calc(var(--dayFraction) * 100%);
    transform: translateX(-100%) translateY(-50%);
  }

  .time {
    width: max-content;
    padding: 5px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    z-index: 10000;
  }

  .current {
    background-color: #444;
    color: white;
  }
  .mouse {
    background-color: white;
    color: black;
  }
</style>
