<script lang="ts">
  export let title: string = "config";
</script>

<div class="config">
  <h1>{title}</h1>
  <div class="grid">
    <slot />
  </div>
</div>

<style>
  .config {
    box-sizing: border-box;
    width: max-content;
    max-width: 100%;
    font-size: 1.2rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
</style>
