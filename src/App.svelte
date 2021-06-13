<script lang="ts">
  import ConfigPanel from "./ConfigPanel.svelte";
  import Reference from "./Reference.svelte";
  import ZoneGrid from "./ZoneGrid.svelte";
</script>

<main>
  <h1>timezones</h1>
  <ZoneGrid />
  <ConfigPanel />
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
  }

  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
