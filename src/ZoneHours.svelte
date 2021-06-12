<!-- ZoneHours.svelte -->
<script lang="ts">
  import { hourGradient, hours, localDayStart } from "./timeStores";
  // import ZoneHourCell from "./ZoneHourCell.svelte";

  export let zone: string;
  export let backgroundColor: string;

  $: background = `background: ${hourGradient(
    $localDayStart,
    zone,
    backgroundColor,
    $hours
  )};`;
</script>

<div style={background} />

<!-- <div>
  {#each $hours as hour}
    <ZoneHourCell {hour} {zone} />
  {/each}
</div>

<style>
  div {
    display: flex;
    height: 100%;
  }
</style> -->
<style>
  div {
    height: 100%;
    width: 100%;
    /* border-radius: 10px; */
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
