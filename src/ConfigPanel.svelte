<script lang="ts">
  import { isNil } from "lodash";
  import query from "./query-store";
  import { barEndHour, barStartHour, localTimeZone, zones } from "./timeStores";
</script>

<h1>config</h1>
<div class="config">
  <label for="localTimeZone">local time zone</label>
  <select id="localTimeZone" bind:value={$query.tz}>
    {#each $zones as zone}
      <option value={zone} selected={zone == $localTimeZone}>{zone}</option>
    {/each}
  </select>

  <label for="barStartHour">start hour</label>
  <input
    id="barStartHour"
    type="number"
    max={String($barEndHour - 1)}
    placeholder={String($barStartHour)}
    bind:value={$query.start}
    on:focus={() => {
      if (isNil($query.start)) {
        $query.start = String($barStartHour);
      }
    }}
  />

  <label for="barEndHour">end hour</label>
  <input
    id="barEndHour"
    type="number"
    min={String($barStartHour + 1)}
    placeholder={String($barEndHour)}
    bind:value={$query.end}
    on:focus={() => {
      if (isNil($query.end)) {
        $query.end = String($barEndHour);
      }
    }}
  />
</div>
<button on:click={() => ($query = {})}>reset to defaults</button>

<style>
  .config {
    width: max-content;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
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

  input,
  select {
    justify-self: end;
  }

  input[type="number"] {
    width: 80px;
    text-align: end;
  }

  select {
    width: min-content;
  }

  button {
    margin: 20px;
    padding: 10px;
  }
</style>
