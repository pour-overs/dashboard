<script>

  export let size = 24;
  export let color = "black";

  import { setContext } from "svelte";

  setContext("iconStyle", { size, color });
</script>

<slot />