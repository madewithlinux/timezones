<script lang="ts">
  import type { DateTime } from "luxon";
  import { fade } from "svelte/transition";
  import Position from "./Position.svelte";
  import { zones } from "./timeStores";
  import ZonedTimeDisplay from "./ZonedTimeDisplay.svelte";

  export let ratio: number;
  export let time: DateTime;
  export let backgroundColor = "#444";
  export let color = "#fff";

  $: colors = `
  background-color: ${backgroundColor};
  color: ${color};
  `;

  $: cursorStyle = `
  grid-column-start: 2;
  grid-column-end: span 1;
  height: 100%;
`;

  $: rowStyle = (i: number) => `
    grid-row-start: ${i + 1};
    grid-row-end: span 1;
    grid-column-start: 2;
    grid-column-end: span 1;
    height: 100%;
  `;
</script>

<Position {ratio} style={cursorStyle}>
  <div transition:fade class="cursor" style={colors} />
</Position>
{#each $zones as zone, i (zone)}
  <Position {ratio} style={rowStyle(i)}>
    <div transition:fade class="time" style={colors} slot="align_center">
      <ZonedTimeDisplay {zone} {time} />
    </div>
  </Position>
{/each}

<style>
  .cursor {
    width: 4px;
    height: 100%;
    transform: translateX(-50%);
  }

  .time {
    width: max-content;
    padding: 5px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
</style>
