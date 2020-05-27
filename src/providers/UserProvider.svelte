<script>
  import { setContext } from "svelte";
  export let user;

  setContext("user", user);
</script>


<slot />