<script lang="ts">
  import { writable } from "svelte/store";
  import { spring } from "svelte/motion";
  import { barEndHour, barStartHour, cursorPosition, localDayStart } from "$lib/timeStores";
  import { timeZoneConfig } from "$components/TimeZoneConfigPanel.svelte";

  
  const xCoord = writable(0);
  let mouseActive = false;
  let clientWidth: number | undefined;
  
  $: ratio = $xCoord / (clientWidth ?? 1);
  const roundRatio = spring(0);
  
  $: barStartTime = $localDayStart.plus({ hours: $barStartHour });
  $: barTotalMinutes = ($barEndHour - $barStartHour) * 60;
  $: time = barStartTime.plus({ minutes: ratio * barTotalMinutes });
  
  $: roundTo15Min = $timeZoneConfig.snapTo15Minutes;
  
  $: if (mouseActive && roundTo15Min) {
    const roundTime = time.plus({ minutes: 15 - (time.minute % 15) }).startOf("minute");
    const roundMinutes = Math.round(roundTime.diff(barStartTime, "minutes").minutes);
    roundRatio.set(roundMinutes / barTotalMinutes);
    cursorPosition.set({
      active: true,
      marginLeft: $xCoord,
      ratio: $roundRatio,
      time: roundTime,
    });
  }

  $: {
    if (mouseActive) {
      if (!roundTo15Min) {
        cursorPosition.set({
          active: true,
          marginLeft: $xCoord,
          ratio,
          time,
        });
      }
    } else {
      $cursorPosition.active = false;
    }
  }

  let inst: HTMLDivElement;
</script>

<svelte:window
  on:click={(e) => {
    if (e.target !== inst && mouseActive) {
      mouseActive = false;
    }
  }}
/>

<div
  class="area"
  bind:clientWidth
  bind:this={inst}
  on:mouseenter|self={(e) => (mouseActive = true)}
  on:mouseleave|self={(e) => (mouseActive = false)}
  on:mousemove|self={(e) => ($xCoord = e.offsetX)}
  on:click|self={(e) => ($xCoord = e.offsetX)}
  on:pointermove|self={(e) => {
    // we have to mark it active on a touch event manually,
    // since the normal enter/leave doesn't happen
    $xCoord = e.offsetX;
    mouseActive = true;
  }}
/>

<style>
  .area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    grid-column-start: 2;
    grid-column-end: span 1;
    justify-self: stretch;
    align-self: stretch;
    z-index: 10000;
  }
</style>
