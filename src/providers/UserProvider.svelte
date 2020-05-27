<script>
  import { setContext } from "svelte";
  export let user;
  export let isAuthorized;

  setContext("user", user);
  setContext("isAuthorized", isAuthorized);
</script>


<slot />