<script lang="ts">
  import { zones, barStartHour, barEndHour, localTimeZone } from "./timeStores";
  import query from "query-store";
  import { DateTime } from "luxon";
  import { isNil } from "lodash";
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
    bind:value={$query.start}
    placeholder={String($barStartHour)}
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
    min={String($query.start ?? $barStartHour)}
    bind:value={$query.end}
    placeholder={String($barEndHour)}
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
    /* width: min(max-content, 100%); */
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
