<script lang="ts">
  import { zones, barStartHour, barEndHour, localTimeZone } from "./timeStores";
</script>

{@debug $localTimeZone}

<h1>config</h1>
<div class="config">
  <label for="localTimeZone">local time zone</label>
  <select id="localTimeZone" bind:value={$localTimeZone}>
    {#each $zones as zone}
      <option value={zone}>{zone}</option>
    {/each}
  </select>

  <label for="barStartHour">start hour</label>
  <input id="barStartHour" type="number" bind:value={$barStartHour} />

  <label for="barEndHour">end hour</label>
  <input id="barEndHour" type="number" bind:value={$barEndHour} />
</div>

<style>
  .config {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .config,
  label,
  input {
    font-size: 1.2rem;
  }
  label {
    justify-self: stretch;
    align-self: stretch;
  }

  input, select {
    justify-self: end;
  }

  input[type="number"] {
    width: 80px;
    text-align: end;
  }


  select {
    width: min-content;
  }

</style>
