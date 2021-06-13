<script lang="ts">
  import ZoneBars from "./ZoneBars.svelte";
  import GridTimeCursor from "./CurrentTimeCursor.svelte";
  import Reference from "./Reference.svelte";
import MouseListener from "./MouseListener.svelte";
</script>

<main>
  <h2>timezones</h2>
  <div class="grid">
    <GridTimeCursor />
    <ZoneBars />
    <MouseListener />
  </div>
  <Reference/>
</main>

<style>
	:global(body) {
	/* color: #333; */
	margin: 0;
	padding: 8px;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .grid {
    position: relative;
    z-index: 0;
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-areas: label time bar;
    /* gap: 5px; */
    column-gap: 2px;
    row-gap: 10px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
