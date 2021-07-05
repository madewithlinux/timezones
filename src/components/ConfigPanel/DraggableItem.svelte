<script>
  import { createEventDispatcher } from "svelte";
  import DragDrop from "svelte-dragdroplist";

  const dispatch = createEventDispatcher();

  export let value = [];
  export let activeValue = undefined;
  export let isDisabled = false;
  export let multiFullItemClearable = false;
  export let getSelectionLabel = undefined;

  function handleClear(i, event) {
    event.stopPropagation();
    dispatch("multiItemClear", { i });
  }

  // TODO: it seems this is basically not doable? because both this component and DragDrop want to directly modify their props
  let dragDrop: DragDrop = undefined;
  $: if (dragDrop) {
    dragDrop.$set({ data: value.map(getSelectionLabel) });
  }
  let data: string[] = value.map(getSelectionLabel);
  $: if (data && data !== value.map(getSelectionLabel)) {
    value = data.map((v) => ({ label: v, value: v }));
  }

  $: console.log({ dragDrop, data, value });
</script>

<DragDrop bind:this={dragDrop} bind:data removesItems={true} />
