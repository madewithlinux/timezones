<script lang="ts">
  export let wide: boolean | undefined = undefined;
  export let text: string | undefined = undefined;
</script>

<button class:wide on:click>
  <slot>{text}</slot>
</button>

<style>
  .wide {
    grid-column-start: 1;
    grid-column-end: span 2;
  }
  button {
    padding: 10px;
  }
</style>
