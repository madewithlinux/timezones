<script lang="ts">
  import TimeZoneConfigPanel from "$components/TimeZoneConfigPanel.svelte";
  import Reference from "$components/Reference.svelte";
  import TimeTitle from "$components/TimeTitle.svelte";
  import ZoneGrid from "$src/components/zone_grid/ZoneGrid.svelte";
</script>

<main>
  <TimeTitle />
  <ZoneGrid />
  <TimeZoneConfigPanel />
  <Reference />
</main>

<style>
  :global(body) {
    /* color: #333; */
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 1.2rem;
  }

  main {
    /* padding: 1em; */
    padding-left: 1em;
    padding-right: 1em;
    /* max-width: 240px; */
    margin: 0 auto;
  }

  @media (max-width: 1000px) {
    :global(body) {
      padding: 0;
    }
    main {
      max-width: none;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>
