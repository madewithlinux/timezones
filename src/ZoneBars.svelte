<script lang="ts">
  import colors from "./colors";
  import { zones } from "./timeStores";
  import ZoneHours from "./ZoneHours.svelte";

  $: zones_with_colors = $zones.map((zone, i) => [
    zone,
    colors[i % colors.length],
  ]);
</script>

{#each zones_with_colors as [zone, color] (zone)}
  <div class="label" style="background-color: {color};">{zone}</div>
  <ZoneHours {zone} backgroundColor={color} />
{/each}

<style>
  .label {
    padding: 20px;
    padding-right: 40px;
  }

  .label {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  @media (max-width: 1000px) {
    .label {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>
