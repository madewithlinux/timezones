<script lang="ts">
  import { fromPairs,isBoolean,isNil,omit,toPairs,values } from "lodash";
  import query from "query-store";
  import Button from "./Button.svelte";
  import { getConfigContext } from "./ConfigPanel.svelte";

  const { config, defaults } = getConfigContext();

  /**
   * map from config key to query key. Required if autosave or autoload are true
   */
  export let queryKeyMap: Record<string, string> | undefined;
  export let autoload: boolean = true;
  export let autosave: boolean = false;

  $: if ((autoload || autosave) && !queryKeyMap) {
    console.error("queryKeyMap is required if autosave or autoload are true");
  }

  if (autoload && queryKeyMap) {
    $config = fromPairs(
      toPairs(queryKeyMap)
        //
        .map(([ck, qk]) => [ck, $query[qk]])
    );
  }

  function saveConfigToQuery() {
    $query = {
      ...omit($query, values(queryKeyMap)),
      ...fromPairs(
        toPairs($config)
          .filter(([k, v]) => k in queryKeyMap && v != defaults[k] && !isNil(v))
          .map(([k, v]) => [queryKeyMap[k], String(v)])
      ),
    };
  }

  $: $config, autosave && queryKeyMap && saveConfigToQuery();
</script>

<Button
  on:click={() => {
    $query = omit($query, values(queryKeyMap ?? {}));
    $config = {};
  }}
>
  Reset
</Button>

<Button on:click={() => saveConfigToQuery()}>Save</Button>
