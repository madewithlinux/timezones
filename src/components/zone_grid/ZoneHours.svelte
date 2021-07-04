<!-- ZoneHours.svelte -->
<script lang="ts">
  import { hourGradient, hours, localDayStart } from "$lib/timeStores";

  export let zone: string;
  export let backgroundColor: string;

  $: background = `background: ${hourGradient(
    $localDayStart,
    zone,
    backgroundColor,
    $hours
  )};`;
</script>

<div class="gradient" style={background} />

<style>
  .gradient {
    height: 100%;
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
  }
</style>
