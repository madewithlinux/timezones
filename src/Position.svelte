<!-- Position.svelte -->
<script lang="ts">
  export let ratio: number;
  export let style: string = "";
</script>

<div class="position" style="--ratio: {ratio}; {style}">
  <slot {ratio} />
  {#if $$slots.align_center}
    <div class="inner">
      <slot name="align_center" {ratio} />
    </div>
  {/if}
</div>

<style>
  .position {
    position: absolute;
    height: 100%;
    top: 0;
    left: calc(var(--ratio) * 100%);
    width: 0;
  }

  .inner {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
</style>
