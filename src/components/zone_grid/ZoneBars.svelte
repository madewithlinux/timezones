<script lang="ts">
  import { colors as baseColors } from "$lib/colors";
  import { timeZoneConfig,zones } from "$lib/timeStores";
  import { flip } from "svelte/animate";
  import DownArrow from "./DownArrow.svelte";
  import UpArrow from "./UpArrow.svelte";
  import ZoneHours from "./ZoneHours.svelte";

  let colors = [...baseColors];
  let nColors = baseColors.length;
  $: zones_with_colors = $zones.map((zone, i) => [zone, colors[i % nColors]]);

  $: swapZones = (i: number, j: number) => {
    const newZones = [...$zones];
    [newZones[i], newZones[j]] = [newZones[j], newZones[i]];
    $timeZoneConfig.zones = newZones;

    [colors[i % nColors], colors[j % nColors]] = [colors[j % nColors], colors[i % nColors]];
  };

</script>

{#each zones_with_colors as [zone, color], i (zone)}
  <div
    class="labelContainer"
    style=" background-color: {color}; grid-row: {i + 1}; grid-column: 1;"
    animate:flip={{ duration: 200 }}
  >
    <div class="buttons">
      <button class="up" class:hidden={i === 0} on:click={() => swapZones(i, i - 1)}>
        <UpArrow />
      </button>
      <button
        class="down"
        class:hidden={i === zones_with_colors.length - 1}
        on:click={() => swapZones(i, i + 1)}
      >
        <DownArrow />
      </button>
    </div>
    <div class="label">
      {zone}
    </div>
  </div>
{/each}

{#each zones_with_colors as [zone, color], i (zone)}
  <div style="grid-row: {i + 1}; grid-column: 2;" animate:flip={{ duration: 200 }}>
    <ZoneHours {zone} backgroundColor={color} />
  </div>
{/each}

<style>
  .labelContainer {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: row;
  }
  .label {
    padding: 20px;
    /* padding-right: 40px; */
    padding-left: 0;
  }

  .hidden {
    visibility: hidden;
  }

  .buttons {
    width: 32px;
    min-width: 32px;
    margin: auto 0;
    display: flex;
    flex-direction: column;
  }
  .buttons button {
    cursor: pointer;
    width: 18px;
    height: 18px;
    margin: 0 auto;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: inherit;
  }

  @media (max-width: 1000px) {
    .label {
      padding-right: 10px;
    }
  }
</style>
